const Footer = () => {
  // The year of the footer is always up to date.
  const year = new Date().getFullYear();
  return (
    <footer className="w-full flex justify-center mt-10 mb-5">
      <span className="text-xs text-gray-400">
        Copyright &#169; New Hong Kong {year}
      </span>
    </footer>
  );
};

export default Footer;
