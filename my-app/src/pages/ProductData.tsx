import { Link, useParams } from "react-router-dom";
import "./ProductData.css";
import { CircularProgress } from "@mui/material";
import { useProductQuery } from "@my-app/hooks";
import { Trans, useTranslation } from "react-i18next";

export function ProductData() {
  const { id } = useParams()
  const { t } = useTranslation('products')

  const { data, isLoading, isError, error } = useProductQuery(id);



  return (
  <div className="product_data">
    {isLoading && 
      <div className="product_data_spinner">
        <CircularProgress size={32} />
      </div>
    }
    {isError && 
      <div className="product_data_error">{t('error')}: {error.message} </div>
    }
    <div className="product_data" data-testid="product-container">
      <h2>{data?.title}</h2>
      <img src={data?.image} alt={data?.title} className="product_data_image" />

      <p className='product_data_description_title'>
        {t('description')}
      </p>

      <p className="product_data_description">{data?.description}</p>
      
      <p className="product_data_price">
        <Trans
          i18nKey="price.details"
          ns="products"
          values={{ price: data?.price }}
          components={{ strong: <strong /> }}
        />
      </p>
        <Link to="/">
          <button className="product_data_back_button">{t('back')}</button>
        </Link>
    </div>
  </div>
  )
}
