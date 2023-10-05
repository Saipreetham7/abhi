// reacts
import { useEffect, useRef, useState } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom";

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  const [selectedPriority, setSelectedPriority] = useState("");

  // Function to handle the change when the user selects a priority
  const handlePriorityChange = (e) => {
    setSelectedPriority(e.target.value);
  };

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const currencyOptions = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CAD",
    // Add more currency options as needed
  ];

  const [selectedCurrency, setSelectedCurrency] = useState("");

  // Function to handle the change when the user selects a currency
  const handleCurrencyChange = (e) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>

        <div className="grid-xs">
          <label htmlFor="currency">Select Currency:</label>
          <select
            id="currency"
            value={selectedCurrency}
            onChange={handleCurrencyChange}
          >
            <option value="">-- Select Currency --</option>
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          {selectedCurrency && <p>You selected: {selectedCurrency}</p>}
        </div>

        <div className="grid-xs">
          <label htmlFor="priority">Tags:</label>
          <select
            id="priority"
            value={selectedPriority}
            onChange={handlePriorityChange}
          >
            <option value="">-- Tags --</option>
            <option value="essential">Essential</option>
            <option value="high-priority">High Priority</option>
            <option value="low-priority">Low Priority</option>
            <option value="emergency">Emergency</option>
          </select>
          {selectedPriority && <p>You selected: {selectedPriority}</p>}
        </div>

        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="text"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Create budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
