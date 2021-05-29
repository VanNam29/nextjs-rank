import Layout from "../../components/Layout/Layout";
import styles from "./country.module.css";

const Country = ({ country }) => {
  console.log("country", country);
  return (
    <Layout title={country.name}>
      <div>
        <div className={styles.overview_panel}>
          <img src={country.flag} alt={country.name}></img>

          <h1 className={styles.oveview_name}>{country.name}</h1>
          <div className={styles.oveview_region}>{country.region}</div>

          <div className={styles.oveview_numbers}>
            <div className={styles.oveview_population}>
              <div className={styles.oveview_value}>{country.population}</div>
              <div className={styles.oveview_label}>Population</div>
            </div>

            <div className={styles.oveview_area}>
              <div className={styles.oveview_value}>{country.area}</div>
              <div className={styles.oveview_label}>Area</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

// export const getServerSideProps = async ({ params }) => {
//   const res = await fetch(
//     `https://restcountries.eu/rest/v2/alpha/${params.id}`
//   );
//   const country = await res.json();

//   return {
//     props: {
//       country,
//     },
//   };
// };

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.eu/rest/v2/all");
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: { id: country.alpha3Code },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${params.id}`
  );
  const country = await res.json();

  return {
    props: {
      country,
    },
  };
};
