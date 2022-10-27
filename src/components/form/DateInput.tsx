import React from "react";

const DateInput = (props: {}) => {
    // const validateInput = (event: React.KeyboardEvent) => {
    //     // console.log(event);
    //     const regex1 = /[0-9]{2}/;
    //     const regex2 = /[0-9]{2}\/[0-9]{2}/;
    //     const letterRegex = /[^0-9]/;
    //     let target = event.target as HTMLInputElement;
    // }

    return (
        <div id='date-input'>
            <div id='start-date-section'>
                <h3>Proration Start Date</h3>
                <div className='date-section'>
                    <label htmlFor='start-date'>Enter a Date:</label>
                    <input type="text" id='start-date' name='start-date' className='date-picker date' required />

                    <label htmlFor='start-time'>Enter a Time:</label>
                    <div id='time-input-section'>
                        <input type="text" id="start-time" name='start-time' className='time-picker time' required />
                        <div id='am-pm-input-section'>
                            <input type='radio' id='start-am' name='start-am-pm' className='am-pm' defaultChecked />
                            <label htmlFor='start-am'>AM</label>
                            <input type='radio' id='start-pm' name='start-am-pm' className='am-pm' />
                            <label htmlFor="start-pm">PM</label>
                        </div>
                    </div>
                </div>
            </div>

            <div id='period-start-date-section'>
                <h3>Period Start Date</h3>
                <div className='date-section'>
                    <label htmlFor='period-start-date'>Enter a Date:</label>
                    <input type="text" id='period-start-date' name='period-start-date' className='date-picker date' required />

                    <label htmlFor='period-start-time'>Enter a Time:</label>
                    <div id='time-input-section'>
                        <input type="text" id="period-start-time" name='period-start-time' className='time-picker time' required />
                        <div id='am-pm-input-section'>
                            <input type='radio' id='period-start-am' name='period-start-am-pm' className='am-pm' defaultChecked />
                            <label htmlFor='period-start-am'>AM</label>
                            <input type='radio' id='period-start-pm' name='period-start-am-pm' className='am-pm' />
                            <label htmlFor="period-start-pm">PM</label>
                        </div>
                    </div>
                </div>
            </div>
                    
            <div id='end-date-section'>
                <h3>Period End Date</h3>
                <div className='date-section'>
                    <label htmlFor='end-date'>Enter a Date:</label>
                    <input type="text" id='end-date' name='end-date' className='date-picker date' required />

                    <label htmlFor='end-time'>Enter a Time:</label>
                    <div id='time-input-section'>
                        <input type="text" id="end-time" name='end-time' className='time-picker time' required />
                        <div id='am-pm-input-section'>
                            <input type='radio' id='end-am' name='end-am-pm' className='am-pm' defaultChecked />
                            <label htmlFor='end-am'>AM</label>
                            <input type='radio' id='end-pm' name='end-am-pm' className='am-pm' />
                            <label htmlFor="end-pm">PM</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default DateInput;