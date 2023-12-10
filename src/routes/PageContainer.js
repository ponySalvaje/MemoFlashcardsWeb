import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const PageContainer = ({ element, hideFooter }) => {
  return (
    <>
      <Header />
      {element}
      {!hideFooter && <Footer />}
    </>
  );
};

export default PageContainer;
