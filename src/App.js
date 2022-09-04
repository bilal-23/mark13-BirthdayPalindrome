import { useRef, useState } from "react";
import Footer from "./components/Footer";
import "./styles.css";

function reverseString(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  return str === reverseString(str);
}
function dateToString(date) {
  const dateStr = {};
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();

  return dateStr;
}

function dateAllVariation(date) {
  const ddmmyyyy = date.day + date.month + date.year;
  const mmddyyyy = date.month + date.day + date.year;
  const yyyymmdd = date.year + date.month + date.day;
  const ddmmyy = date.day + date.month + date.year.slice(-2);
  const mmddyy = date.month + date.day + date.year.slice(-2);
  const yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function checkPalindromesForAllDateFormats(date) {
  const allDateFormats = dateAllVariation(date); //get all variation of date i.e ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd
  let palindromeFlag = false;

  //loop through all date formats and check if it is a palindrome
  for (let i = 0; i < allDateFormats.length; i++) {
    if (isPalindrome(allDateFormats[i])) {
      palindromeFlag = true;
      break;
    }
  }
  return palindromeFlag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

//this function takes a date, increase it by 1 and returns new date
function getNextDate(date) {
  // Easier way to increase by one
  // const dateObj = new Date(date.year, date.month, date.day);
  // const dateInMilliseconda = dateObj.getTime();
  // console.log(new Date(dateInMilliseconda + 86400000)); 864000000 is 24 hours in milliseconds;

  // Other Way
  //increasing date by 1;
  let day = +date.day + 1;
  let month = +date.month;
  let year = +date.year;
  // Array containing total number of days for each month;
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    //check for leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    }
    // Not a leap year but february
    else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return dateToString({ day, month, year }); //take cares of the 0 if less than 10;
}

function getNextPalindromeDate(date) {
  let nextDate = (date);
  let counter = 0;
  while (true) {
    counter++;
    let isPalindrome = checkPalindromesForAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    } else {
      nextDate = getNextDate(nextDate);
    }
  }
  return { counter, nextDate };
}
function getPrevDate(date) {
  const curDate = new Date(date.year, date.month, date.day).getTime();
  const previousDate = new Date(curDate - 86400000);
  const day = previousDate.getDate();
  const month = previousDate.getMonth();
  const year = previousDate.getFullYear();

  return dateToString({ day, month, year });
}

function getPrevPalindromeDate(date) {
  let prevDate = getPrevDate(date);
  let counter = 0;
  while (true) {
    counter++;
    let isPalindrome = checkPalindromesForAllDateFormats(prevDate);
    if (isPalindrome) {
      break;
    } else {
      prevDate = getPrevDate(prevDate);
    }
  }
  return { counter, prevDate };
}

export default function App() {
  const dateRef = useRef();
  const [success, setSuccess] = useState();
  const [error, setError] = useState();

  function formSubmitHandelr(e) {
    e.preventDefault();
    let dateInput = dateRef.current.value;
    if (dateInput === "") {
      setError("Invalid Input");
      setSuccess(false);
      return;
    }
    let date = dateInput.split("-");
    const yyyy = +date[0];
    const mm = +date[1];
    const day = +date[2];
    date = {
      day: day,
      month: mm,
      year: yyyy
    };
    //Convert date to string format and if any element is less than 10 add a 0 to prefix
    date = dateToString(date);
    //Check Palindrome for all dateFormats
    const flag = checkPalindromesForAllDateFormats(date);
    if (flag) {
      setSuccess("Yay, your birthdate is a palindrome !");
      setError(false);
      return;
    } else {
      setSuccess(false);
      getNextDate(date);
      const nextPalindrome = getNextPalindromeDate(date);
      const prevPalindrome = getPrevPalindromeDate(date);

      if (nextPalindrome.counter < prevPalindrome.counter) {
        setSuccess(false);
        setError(
          `OOps! Your birthday is not a palindrome. The nearest palindrome is ${nextPalindrome.nextDate.day
          }/${nextPalindrome.nextDate.month}/${nextPalindrome.nextDate.year
          } and you missed it by ${nextPalindrome.counter} ${nextPalindrome.counter > 1 ? "days" : "day"
          }`
        );
      } else {
        setSuccess(false);
        setError(
          `OOps! Your birthday is not a palindrome. The nearest palindrome was ${prevPalindrome.prevDate.day
          }/${prevPalindrome.prevDate.month}/${prevPalindrome.prevDate.year
          } and you missed it by ${prevPalindrome.counter} ${prevPalindrome.counter > 1 ? "days" : "day"
          }`
        );
      }
    }
  }
  return (
    <>
      <main className="App">
        <header className="header">
          <h1 className="heading">Palindrome Birthday</h1>
        </header>
        <form onSubmit={formSubmitHandelr} className="container">
          <div className="input-group">
            <label htmlFor="date">Enter Your Birthdate: </label>
            <input id="date" type="date" min={1} required ref={dateRef} />
          </div>
          <div className="btn-container">
            <button type="submit" className="button">
              Check
            </button>
          </div>
        </form>
        <div className="output">
          {success && !error && <p className="success">{success}</p>}
          {!success && error && <p className="error">{error}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
