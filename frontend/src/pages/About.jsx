export default function About() {
  return (
    <div className="container mt-5 mb-5">

      {/* 🔵 HERO / INTRO */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">SmartSpend 💰</h1>
        <p className="lead mt-3">
          Smart expense tracking and budget management made simple.
        </p>
      </div>

      {/* 🟢 ABOUT CARD */}
      <div className="card shadow p-4 mb-5">
        <h3 className="mb-3">About SmartSpend</h3>

        <p>
          SmartSpend is a modern expense tracking web application designed to help
          users manage their finances efficiently. It allows you to track income,
          monitor expenses, and understand your spending habits.
        </p>

        <p>
          With features like budgeting, charts, and AI-based insights, SmartSpend
          helps you make smarter financial decisions.
        </p>

        <p>
          Whether you are a student or working professional, SmartSpend makes
          financial management simple and effective.
        </p>
      </div>

      {/* 🟡 FEATURES */}
      <div className="row text-center mb-5">

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>📊 Track Expenses</h5>
            <p>Easily add and manage your daily expenses.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>💡 AI Insights</h5>
            <p>Get smart suggestions based on your spending.</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow p-3">
            <h5>📈 Visual Reports</h5>
            <p>Analyze income and expenses using charts.</p>
          </div>
        </div>

      </div>

      {/* 🔴 FAQ SECTION */}
      <h3 className="mb-3">Frequently Asked Questions ❓</h3>

      <div className="accordion" id="faq">

        {/* Q1 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#q1"
            >
              What is SmartSpend?
            </button>
          </h2>

          <div id="q1" className="accordion-collapse collapse show">
            <div className="accordion-body">
              SmartSpend is an expense tracking app that helps you manage
              income and expenses efficiently.
            </div>
          </div>
        </div>

        {/* Q2 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#q2"
            >
              Is SmartSpend free?
            </button>
          </h2>

          <div id="q2" className="accordion-collapse collapse">
            <div className="accordion-body">
              Yes, SmartSpend is completely free for personal use.
            </div>
          </div>
        </div>

        {/* Q3 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#q3"
            >
              How does AI insight work?
            </button>
          </h2>

          <div id="q3" className="accordion-collapse collapse">
            <div className="accordion-body">
              AI analyzes your transactions and gives helpful suggestions
              to improve your spending habits.
            </div>
          </div>
        </div>

        {/* Q4 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#q4"
            >
              Is my data safe?
            </button>
          </h2>

          <div id="q4" className="accordion-collapse collapse">
            <div className="accordion-body">
              Yes, your data is securely stored and protected.
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}