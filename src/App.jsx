import React, { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState("");
  const [holder, setHolder] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");
  // ========================================================================функиця для переворота карты
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  // ========================================================================состояния для отслеживания взаимодействия с полем ввода
  const [numberDirty, setNumberDirty] = useState(false);
  const [holderDirty, setHolderDirty] = useState(false);
  const [cvvDirty, setCvvDirty] = useState(false);
  // ========================================================================сообщения об ошибках валидации
  const [numberError, setNumberError] = useState("Номер не может быть пустым");
  const [holderError, setHolderError] = useState(
    "Пользователь не может быть пустым"
  );
  const [cvvError, setCvvError] = useState("CVV-код не может быть пустым");

  // ========================================================================функция которая обрабатывает потерю фокуса с поля ввода
  const blurHandler = (e) => {
    switch (e.target.name) {
      case "number":
        setNumberDirty(true);
        break;
      case "holder":
        setHolderDirty(true);
        break;
      case "cvv":
        setCvvDirty(true);
        setIsCardFlipped(false);
        break;
    }
  };

  // ========================================================================изобраджения на карте
  const cardBackgrounds = [
    "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/1.jpeg",
    "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/2.jpeg",
    "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/3.jpeg",
    "https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/4.jpeg",
  ];

  // =========================функция для рандомного изображения на карте
  const getRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * cardBackgrounds.length);
    return cardBackgrounds[randomIndex];
  };

  // ======================================================================Форматирование номера карты
  const formatCardNumber = (inputValue, setNumber, setNumberError) => {
    const digitsOnly = inputValue.replace(/\D/g, "");
    const truncated = digitsOnly.slice(0, 16);
    const formatted = truncated.replace(/(\d{4})(?=\d)/g, "$1 ");
    setNumber(formatted);

    if (truncated.length < 16) {
      setNumberError("Введите 16 цифр");
    } else {
      setNumberError("");
    }

    return formatted;
  };

  // ================================================================поле имени пользователя
  const handleHolderChange = (e) => {
    const value = e.target.value;
    setHolder(value);
    if (value.length > 0) {
      setHolderError("");
    }
  };

  // ================================================================поле кода CVV
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value);
    if (value.length > 0) {
      setCvvError("");
    }
  };

  return (
    <div className="payment-container">
      {/* Банковская карта */}
      <div className={`card-visual ${isCardFlipped ? "-active" : ""}`}>
        <div className="card-visual__side -front">
          <div className="card-visual__cover">
            <img
              src={getRandomBackground()}
              className="card-visual__bg"
              alt="Card background"
            />
          </div>

          <div className="card-visual__wrapper">
            <div className="card-visual__top">
              <img
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                className="card-visual__chip"
                alt="Chip"
              />
              <div className="card-visual__type">
                <img
                  src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                  className="card-visual__typeImg"
                  alt="Card type"
                />
              </div>
            </div>
            {/* ==============================================================блок для отображения номера карты */}
            <div className="card-visual__number">
              {number || "•••• •••• •••• ••••"}
            </div>
            <div className="card-visual__content">
              <div className="card-visual__info">
                <div className="card-visual__holder">Card Holder</div>
                {/*=====================================================блок для отображения номера карты */}
                <div className="card-visual__name">{holder || "FULL NAME"}</div>
              </div>
              <div className="card-visual__date">
                <div className="card-visual__dateTitle">Expires</div>
                {/*=========================================================================== блок отображения даты */}
                <div className="card-visual__dateItem">
                  {month || "MM"}/{year ? String(year).slice(2) : "YY"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-visual__side -back">
          <div className="card-visual__cover">
            <img
              src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/1.jpeg"
              className="card-visual__bg"
              alt="Card background"
            />
          </div>
          <div className="card-visual__band"></div>
          <div className="card-visual__cvv">
            <div className="card-visual__cvvTitle">CVV</div>
            {/* ===============================================================блок отображения cvv кода */}
            <div className="card-visual__cvvBand">
              {cvv ? "•".repeat(cvv.length) : "•••"}
            </div>
            <div className="card-visual__type">
              <img
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png"
                className="card-visual__typeImg"
                alt="Card type"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Форма ввода данных */}
      <div className="form-container">
        <div className="form-top">
          <form className="form" action="#">
            <label htmlFor="cardNumber">Card Number</label>
            {/* =================================================блок отображения ошибки при вводе номера карты */}
            {numberDirty && numberError && (
              <div style={{ color: "red" }}>{numberError}</div>
            )}
            <input
              value={number}
              onChange={(e) =>
                formatCardNumber(e.target.value, setNumber, setNumberError)
              }
              onBlur={blurHandler}
              name="number"
              id="cardNumber"
              type="text"
              maxLength={19}
              placeholder="Введите 16-ти значный код карты"
            />

            <label htmlFor="cardHolder">Card Holders</label>
            {/* =============================================отображние ошибки при вводе пользователя */}
            {holderDirty && holderError && (
              <div style={{ color: "red" }}>{holderError}</div>
            )}
            <input
              value={holder}
              onBlur={blurHandler}
              onChange={handleHolderChange}
              name="holder"
              id="cardHolder"
              type="text"
              placeholder="Введите имя пользователя"
            />
          </form>
        </div>

        <div className="form-bottom">
          <div className="dropdown-menu">
            <label>Expiration date</label>
            <div className="dropdown-selects">
              <div className="dropdown-month">
                <select
                  name="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Month</option>
                  {/* ==========================================================создается список для выпадающего меню */}
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthNumber = (i + 1).toString().padStart(2, "0");
                    return (
                      <option key={monthNumber} value={monthNumber}>
                        {monthNumber}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="dropdown-year">
                <select
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Year</option>

                  {/* ========================================================== создается список для выпадающего меню */}
                  {Array.from({ length: 12 }, (_, i) => 2025 + i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="cvv-code">
            <label htmlFor="cvv">CVV</label>
            {/* ========================================вывод ошибки при вводе cvv кода */}
            {cvvDirty && cvvError && (
              <div style={{ color: "red", fontSize: "8px" }}>{cvvError}</div>
            )}
            <input
              type="text"
              name="cvv"
              value={cvv}
              onChange={handleCvvChange}
              onBlur={blurHandler}
              onFocus={() => setIsCardFlipped(true)}
              maxLength={3}
              className="cvv"
              id="cvv"
              placeholder="введите 3-х значный код"
            />
          </div>
        </div>

        <button className="submit">Submit</button>
      </div>
    </div>
  );
}

export default App;
