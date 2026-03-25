function Footer() {
  return (
    <footer className="bg-dark text-light mt-auto">
      <div className="container text-center py-4">

        <h5>SmartSpend 💰</h5>
        <p className="mb-2">
          Smart expense tracking and budget management made easy.
        </p>

        <p className="mb-1">Email: support@SmartSpend.com</p>
        <p className="mb-2">Phone: +91 98765 43210</p>

        <small>
          © {new Date().getFullYear()} SmartSpend. All rights reserved.
        </small>

      </div>
    </footer>
  );
}

export default Footer;