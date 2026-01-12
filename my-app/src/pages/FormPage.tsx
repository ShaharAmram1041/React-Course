import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import "./FormPage.css";
import { useTranslation } from "react-i18next";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number | null;
  phone: string;
  website: string;
  startDate: string;
  country: string;
  preferredContact: "email" | "phone" | "text" | "";
  newsletter: boolean;
  acceptTerms: boolean;
  satisfaction: number;
  bio: string;
};

const STORAGE_KEY = "formCache.v1";

const defaultValues: FormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  age: null,
  phone: "",
  website: "",
  startDate: "",
  country: "",
  preferredContact: "",
  newsletter: false,
  acceptTerms: false,
  satisfaction: 5,
  bio: "",
};

const getCachedValues = (): Partial<FormValues> => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as Partial<FormValues>;
    return parsed ?? {};
  } catch {
    return {};
  }
};


export function FormPage() {
  const cachedValues = useMemo(() => getCachedValues(), []);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation('form');
  


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
    getValues,
    control,
    reset
  } = useForm<FormValues>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: { ...defaultValues, ...cachedValues },
  });

const watchedValues = useWatch({
  control,
  name: [
    "fullName",
    "email",
    "age",
    "phone",
    "website",
    "startDate",
    "country",
    "preferredContact",
    "newsletter",
    "acceptTerms",
    "satisfaction",
    "bio",
  ],
});



  const satisfactionValue = useWatch({ control, name: "satisfaction" });

  useEffect(() => {
    if (typeof window === "undefined" || !watchedValues) {
      return;
    }

    const { ...safeValues } = watchedValues;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(safeValues));
  }, [watchedValues]);


  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("Submitted form data:", data);
    reset();
    setIsLoading(false);
};


  return (
    <div>
      <Backdrop
        open={isLoading}
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.modal + 1,
        }}
        >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="form-page">
        <section className="form-card" aria-labelledby="form-title">
          <header className="form-header">
            <h1 id="form-title">{t('title')}</h1>
            <p className="form-subtitle">{t('subtitle')}</p>
          </header>

          <form className="form-grid" noValidate onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label htmlFor="fullName">{t('fields.fullName')}</label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                {...register("fullName", {
                  required: t("errors.required"),
                  minLength: { value: 2, message: t("errors.fullNameMin") },
                })}
              />
              {errors.fullName && (
                <span className="error" id="fullName-error" role="alert">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="email">{t('fields.email')}</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email", {
                  required: t("errors.required"),
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t("errors.emailInvalid"),
                  },
                })}
              />
              {errors.email && (
                <span className="error" id="email-error" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="password">{t('fields.password')}</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "password-error" : undefined}
                {...register("password", {
                  required: t("errors.required"),
                  minLength: { value: 8, message: t("errors.passwordMin") },
                })}
              />
              {errors.password && (
                <span className="error" id="password-error" role="alert">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">{t('fields.confirmPassword')}</label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                {...register("confirmPassword", {
                  required: t("errors.required"),
                  validate: (value) =>
                    value === getValues("password") || t("errors.passwordMatch"),
                })}
              />
              {errors.confirmPassword && (
                <span className="error" id="confirmPassword-error" role="alert">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="age">{t('fields.age')}</label>
              <input
              type="number"
              {...register("age", {
                  required: t("errors.required"),
                  valueAsNumber: true,
                  min: { value: 13, message: t("errors.ageMin") },
                  max: { value: 120, message: t("errors.ageMax") },
              })}
              />

              {errors.age && (
                <span className="error" id="age-error" role="alert">
                  {errors.age.message}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="phone">{t('fields.phone')}</label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                {...register("phone", {
                  required: t("errors.required"),
                  pattern: {
                    value: /^\+?[0-9\s-]{7,15}$/,
                    message: t("errors.phoneInvalid"),
                  },
                })}
              />
              {errors.phone && (
                <span className="error" id="phone-error" role="alert">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="website">{t('fields.website')}</label>
              <input
                id="website"
                type="url"
                placeholder="https://example.com"
                aria-invalid={Boolean(errors.website)}
                aria-describedby={errors.website ? "website-error" : undefined}
                {...register("website", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
                    message: t("errors.websiteInvalid"),
                  },
                })}
              />
              {errors.website && (
                <span className="error" id="website-error" role="alert">
                  {errors.website.message}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="startDate">{t('fields.startDate')}</label>
              <input
                id="startDate"
                type="date"
                aria-invalid={Boolean(errors.startDate)}
                aria-describedby={errors.startDate ? "startDate-error" : undefined}
                {...register("startDate", {
                  required: t("errors.required"),
                })}
              />
              {errors.startDate && (
                <span className="error" id="startDate-error" role="alert">
                  {errors.startDate.message}
                </span>
              )}
            </div>

            <div className="field">
              <label htmlFor="country">{t('fields.country')}</label>
              <select
                id="country"
                aria-invalid={Boolean(errors.country)}
                aria-describedby={errors.country ? "country-error" : undefined}
                {...register("country", {
                  required: t("errors.required"),
                })}
              >
                <option value="">{t('options.selectCountry')}</option>
                <option value="us">{t('options.countries.us')}</option>
                <option value="ca">{t('options.countries.ca')}</option>
                <option value="is">{t('options.countries.is')}</option>
                <option value="other">{t('options.countries.other')}</option>
              </select>
              {errors.country && (
                <span className="error" id="country-error" role="alert">
                  {errors.country.message}
                </span>
              )}
            </div>

            <fieldset
            className="field fieldset"
            aria-invalid={Boolean(errors.preferredContact)}
            aria-describedby={errors.preferredContact ? "preferredContact-error" : undefined}
          >
              <legend>{t('fields.preferredContact')}</legend>

              <label>
                <input
                  type="radio"
                  value="email"
                  {...register("preferredContact", {
                    required: t("errors.contactRequired"),
                  })}/>
                {/*
              */} {t('options.email')}
              </label>

              <label>
                <input
                  type="radio"
                  value="phone"
                  {...register("preferredContact")}
                />{/*
              */}
                {t('options.phone')}
              </label>

              <label>
                <input
                  type="radio"
                  value="text"
                  {...register("preferredContact")}
                />{/*
              */}
                {t('options.text')}
              </label>

              {errors.preferredContact && (
                <span id="preferredContact-error" role="alert" className="error">
                  {errors.preferredContact.message}
                </span>
              )}
            </fieldset>


            <div className="field">
              <label htmlFor="satisfaction">
                {t('fields.satisfaction')} {satisfactionValue ?? 5}
              </label>
              <input
                id="satisfaction"
                type="range"
                min={1}
                max={10}
                aria-invalid={Boolean(errors.satisfaction)}
                {...register("satisfaction", {
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="field">
              <label htmlFor="bio">{t('fields.bio')}</label>
              <textarea
                id="bio"
                rows={4}
                aria-invalid={Boolean(errors.bio)}
                aria-describedby={errors.bio ? "bio-error" : undefined}
                {...register("bio", {
                  required: t("errors.bioRequired"),
                  minLength: { value: 10, message: t("errors.bioMin") },
                })}
              />
              {errors.bio && (
                <span className="error" id="bio-error" role="alert">
                  {errors.bio.message}
                </span>
              )}
            </div>

            <div className="field">
              <label className="option">
                <input type="checkbox" {...register("newsletter")} />
                {/*
                */}{t('fields.newsletter')}
              </label>
            </div>

            <div className="field">
              <label className="option">
                <input
                  type="checkbox"
                  aria-invalid={Boolean(errors.acceptTerms)}
                  aria-describedby={errors.acceptTerms ? "acceptTerms-error" : undefined}
                  {...register("acceptTerms", {
                    required: t("errors.acceptTermsRequired"),
                  })}
                />
                {/*
              */}{t('fields.acceptTerms')}
              </label>
              {errors.acceptTerms && (
                <span className="error" id="acceptTerms-error" role="alert">
                  {errors.acceptTerms.message}
                </span>
              )}
            </div>

            <div className="actions">
              <button type="submit" disabled={isSubmitting || isLoading}>
              {isLoading ? t('buttons.submitting') : t('buttons.submit')}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
