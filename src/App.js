import "./assets/main.css";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

function App() {
  const [dailyRate, setDailyRate] = useState(0);
  const [dailyRatePay, getDailyRatePay] = useState(0);
  const [semiMonthlyRate, setSemiMonthlyRate] = useState(0);
  const [semiMonthlyRatePay, getSemiMohtlyRatePay] = useState(0);
  const [hourlyrate, setHourlyRate] = useState(0);
  const [ratePerMinute, setRatePerMinute] = useState(0);
  const [regularHoliday, setregularHoliday] = useState(0);
  const [holidayPay, setHolidayPay] = useState(0);
  const [specialHoliday, setSpecialHoliday] = useState(0);
  const [specialHolidayPay, setSpecialHolidayPay] = useState(0);
  const [overTime, setOverTime] = useState(0);
  const [calculateOverTime, setCalculateOvertime] = useState(0);
  const [nightDiff, setNightDiff] = useState(0);
  const [calculateNightDiff, setCalculateNightDiff] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [tardy, setTardy] = useState(0);
  const [tardyDeduct, setTardyDeduct] = useState(0);
  const [undertime, setUnderTime] = useState(0);
  const [underTimeDeduct, setUnderTimeDeduct] = useState(0);
  const [absence, setAbsence] = useState(0);
  const [absenceDeduct, setAbsenceDeduct] = useState(0);
  const [totalDeduction, setTotalDeduction] = useState(0);
  const [bunos, setBunos] = useState(0);
  const [bunosGet, getBunos] = useState(0);
  const [grossIncome, setGrossIncome] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(
      () => setDailyRate(dailyRatePay),
      setSemiMonthlyRate(semiMonthlyRatePay),
      setHourlyRate(dailyRatePay / 8),
      setRatePerMinute(dailyRatePay / 8 / 60),
      setHolidayPay(regularHoliday * dailyRatePay),
      setSpecialHolidayPay(dailyRate * specialHoliday * 0.3),
      setCalculateNightDiff(nightDiff * hourlyrate * 0.2),
      setCalculateOvertime(
        overTime * ratePerMinute + overTime * ratePerMinute * 0.3
      ),
      setTardyDeduct(tardy * (dailyRatePay / 8 / 60)),
      setUnderTimeDeduct(undertime * (dailyRatePay / 8 / 60)),
      setAbsenceDeduct(dailyRatePay * absence),
      setTotalEarnings(
        parseFloat(semiMonthlyRatePay) +
          parseFloat(regularHoliday * dailyRatePay) +
          parseFloat(dailyRate * specialHoliday * 0.3) +
          parseFloat(nightDiff * hourlyrate * 0.2) +
          parseFloat(overTime * ratePerMinute + overTime * ratePerMinute * 0.3)
      ),
      setTotalDeduction(
        parseFloat(tardy * (dailyRatePay / 8 / 60)) +
          parseFloat(undertime * (dailyRatePay / 8 / 60)) +
          parseFloat(dailyRatePay * absence)
      ),
      setBunos(bunosGet),
      setGrossIncome(
        parseFloat(bunosGet) +
          parseFloat(totalEarnings) -
          parseFloat(totalDeduction)
      ),
      500
    );

    return () => clearTimeout(timeOut);
  }, [
    dailyRatePay,
    semiMonthlyRatePay,
    specialHoliday,
    regularHoliday,
    nightDiff,
    overTime,
    tardy,
    undertime,
    absence,
    bunosGet,
  ]);

  const getDailyRate = (val) => {
    setDailyRate(val.target.value);
  };

  const triggerGrossIncome = () => {
    setGrossIncome(
      parseFloat(bunos) + parseFloat(totalEarnings) - parseFloat(totalDeduction)
    );
  };

  return (
    <div className="App">
      <section>
        <div className="netincome">
          <h2 className="title">NET INCOME</h2>
          <div className="dailyrate">
            <label>Daily Rate</label>
            <input
              type="number"
              name="dailyrate"
              id="dailyrate"
              onChange={(e) => getDailyRatePay(e.target.value)}
            />
            <p className="result" />
          </div>
          <div className="semimonthlyrate">
            <label>Semi-Monthly Rate</label>
            <input
              type="number"
              name="semimonthly"
              id="semimonthly"
              onChange={(e) => getSemiMohtlyRatePay(e.target.value)}
            />
            <p className="result" />
          </div>
          <div className="hourlyrate">
            <label>Hourly Rate</label>
            <input type="number" value={hourlyrate.toLocaleString()} disabled />
            <p className="result" />
          </div>
          <div className="minuterate">
            <label>Minute Rate</label>
            <input
              type="number"
              value={ratePerMinute.toLocaleString()}
              disabled
            />
            <p className="result" />
          </div>
          <div className="holiday">
            <label>Regular Holiday</label>
            <input
              type="number"
              name="regularHoliday"
              id="regularHoliday"
              onChange={(e) => setregularHoliday(e.target.value)}
            />
            <p className="result">{holidayPay.toLocaleString()}</p>
          </div>
          <div className="specialholiday">
            <label>Special Holiday</label>
            <input
              type="number"
              name="specialholiday"
              id="specialholiday"
              onChange={(e) => setSpecialHoliday(e.target.value)}
            />
            <p className="result">{specialHolidayPay.toLocaleString()}</p>
          </div>
          <div className="nightdiff">
            <label>Night Diff(Hours)</label>
            <input
              type="number"
              name="nightdiff"
              id="nightdiff"
              onChange={(e) => setNightDiff(e.target.value)}
            />
            <p className="result">{calculateNightDiff.toLocaleString()}</p>
          </div>
          <div className="overtime">
            <label>Overtime(Minutes)</label>
            <input
              type="number"
              name="ot"
              id="ot"
              onChange={(e) => setOverTime(e.target.value)}
            />
            <p className="result">{calculateOverTime.toLocaleString()}</p>
          </div>
          <div className="totalnetincome">
            <h3 className="total">TOTAL: </h3>
            <span>???{totalEarnings.toLocaleString()}</span>
          </div>
        </div>
        <div className="deductions">
          <h2 className="title">DEDUCTION</h2>
          <div className="tardy">
            <label>Tardy</label>
            <input
              type="number"
              name="tardy"
              id="tardy"
              onChange={(e) => setTardy(e.target.value)}
            />
            <p className="result">{tardyDeduct.toLocaleString()}</p>
          </div>
          <div className="undertime">
            <label>Undetime + VTO (Minutes)</label>
            <input
              type="number"
              name="undertime"
              id="undertime"
              onChange={(e) => setUnderTime(e.target.value)}
            />
            <p className="result">{underTimeDeduct.toLocaleString()}</p>
          </div>
          <div className="absence">
            <label>Absences</label>
            <input
              type="number"
              name="absence"
              id="absence"
              onChange={(e) => setAbsence(e.target.value)}
            />
            <p className="result">{absenceDeduct}</p>
          </div>
          <div className="totaldeduction">
            <h3 className="total">TOTAL: </h3>
            <span className="deductotal">
              {totalDeduction.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="grossincome">
          <h2 className="title">GROSS INCOME</h2>
          <div className="bunos">
            <label>Bunos</label>
            <input
              type="number"
              name="bunos"
              id="bunos"
              onChange={(e) => getBunos(e.target.value)}
            />
            <p className="result">0</p>
          </div>
          <div className="totalnetincome">
            <h3 className="total">TOTAL NET INCOME: </h3>
            <span>{totalEarnings.toLocaleString()}</span>
          </div>
          <span className="minus"> - </span>
          <div className="totaldeduction">
            <h3 className="total">TOTAL DEDUCTION: </h3>
            <span className="deductotal">
              {totalDeduction.toLocaleString()}
            </span>
          </div>
          <div className="totalgrossincome">
            <h3 className="total">TOTAL GROSS INCOME: </h3>
            <span>{grossIncome.toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* <table cellPadding="5" cellSpacing="5">
        <thead>
          <tr>
            <th colSpan="3">NET INCOME</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Daily Rate:</td>
            <td>
              <input
                type="number"
                name="dailyrate"
                id="dailyrate"
                placeholder="Daily Rate"
                value={dailyRatePay}
                onChange={(e) => getDailyRatePay(e.target.value)}
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Semi-Monthly Rate</td>
            <td>
              <input
                type="number"
                name="semimonthly"
                id="semimonthly"
                value={semiMonthlyRatePay}
                onChange={(e) => getSemiMohtlyRatePay(e.target.value)}
              />
            </td>
            <td></td>
            <td></td>
          </tr>
          <br />
          <tr>
            <td>Hourly Rate</td>
            <td>{hourlyrate.toLocaleString()}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Rate Per Minute</td>
            <td>{ratePerMinute.toLocaleString()}</td>
            <td></td>
          </tr>
          <br />
          <tr>
            <td>Regular Holiday</td>
            <td>
              <input
                type="number"
                name="regularHoliday"
                id="regularHoliday"
                value={regularHoliday}
                onChange={(e) => setregularHoliday(e.target.value)}
                placeholder="regular Holiday"
              />
            </td>
            <td>{holidayPay.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Special Holiday</td>
            <td>
              <input
                type="number"
                name="specialholiday"
                id="specialholiday"
                value={specialHoliday}
                onChange={(e) => setSpecialHoliday(e.target.value)}
              />
            </td>
            <td>{specialHolidayPay.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Night Diff (Hours)</td>
            <td>
              <input
                type="number"
                name="nightdiff"
                id="nightdiff"
                value={nightDiff}
                onChange={(e) => setNightDiff(e.target.value)}
              />
            </td>
            <td>{calculateNightDiff.toLocaleString()}</td>
          </tr>
          <tr>
            <td>OverTime</td>
            <td>
              <input
                type="number"
                name="ot"
                id="ot"
                value={overTime}
                onChange={(e) => setOverTime(e.target.value)}
              />
            </td>
            <td>{calculateOverTime.toLocaleString()}</td>
          </tr>
          <br />
          <tr>
            <td>Total</td>
            <td colSpan="3" style={{ textAlign: "right" }}>
              {totalEarnings.toLocaleString()}
            </td>
          </tr>
          <br />
          <hr />
          <tr>
            <td colSpan="3">DEDUCTIONS</td>
          </tr>
          <br />
          <tr>
            <td>Tardy (Minutes)</td>
            <td>
              <input
                type="number"
                name="tardy"
                id="tardy"
                onChange={(e) => setTardy(e.target.value)}
              />
            </td>
            <td>{tardyDeduct.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Undertime + VTO (Minutes)</td>
            <td>
              <input
                type="number"
                name="undertime"
                id="undertime"
                onChange={(e) => setUnderTime(e.target.value)}
              />
            </td>
            <td>{underTimeDeduct.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Absences</td>
            <td>
              <input
                type="number"
                name="absence"
                id="absence"
                onChange={(e) => setAbsence(e.target.value)}
              />
            </td>
            <td>{absenceDeduct}</td>
          </tr>
          <br />
          <tr>
            <td>TOTAL</td>
            <td colSpan="3">{totalDeduction.toLocaleString()}</td>
          </tr>
          <br />
          <tr>
            <td>BONUS</td>
            <td>
              <input
                type="number"
                name="bunos"
                id="bunos"
                onChange={(e) => setBunos(e.target.value)}
              />
            </td>
          </tr>
          <br />
          <tr>
            <td>GROSS INCOME</td>
            <td>{grossIncome.toLocaleString()}</td>
            <td>
              <button onClick={triggerGrossIncome}>CALCULATE</button>
            </td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
}

export default App;
