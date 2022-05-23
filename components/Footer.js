const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="w-full flex justify-center mt-10 mb-5">
      <span className="text-xs text-gray-400">
        Copyright &#169; New Hong Kong {year}
      </span>
    </div>
  );
};

export default Footer;
