import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useProductsQuery, type Product } from "@my-app/hooks";
import { useToastStore } from "@my-app/ui";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./Home.css";
import { i18n } from "@my-app/i18n";

export function Home() {
  const [showSpinner, setShowSpinner] = useState(false);
  const { t } = useTranslation(['common', 'products']);
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetched,
  } = useProductsQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(isLoading);
    }, 300);
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    if (isFetched && data) {
      useToastStore.getState().addToast({
        type: "success",
        message: t('fetchSuccess', { ns: 'products', count: data.length }),
        timeout: 3000,
      });
    }
  }, [isFetched, data, t]);

  useEffect(() => {
    if (isError && error) {
      useToastStore.getState().addToast({
        type: "error",
        message: t('fetchError', { ns: 'products' }),
        timeout: 4000,
      });
    }
  }, [isError, error, t]);

  const imageTemplate = (product: Product) => (
  <img
    src={product.image}
    alt={product.title}
    className="product-image"
  />
);


  const actionTemplate = (product: Product) => (
    <Button
      label={t('view', { ns: 'products' })}
      icon="pi pi-eye"
      onClick={() => navigate(`/products/${product.id}`)}
    />
  );

  return (
    <div className="home">
      <h1 className="home_title">{t('title')}</h1>

      <button className="search_button" onClick={() => refetch()}>
        {t('search')}
      </button>

      {showSpinner && (
        <div className="home_spinner">
          <CircularProgress size={32} />
        </div>
      )}

      {isError && (
        <p className="home_error">
          {t("error")}: {error.message}
        </p>
      )}

      {isFetched && data && (
        <DataTable
          key={i18n.language}

          value={data}
          paginator
          rows={5}
          sortMode="single"
          dataKey="id"
          emptyMessage={t('noProducts')}
        >
          <Column field="title" header={t('title', { ns: 'products' })} sortable />
          
          <Column field="price" header={t('price', { ns: 'products' })} sortable />
          <Column field="category" header={t('category', { ns: 'products' })} />
          <Column header={t('image', { ns: 'products' })} body={imageTemplate} />
          <Column header={t('action', { ns: 'products' })} body={actionTemplate} />
        </DataTable>
      )}
    </div>
  );
}
