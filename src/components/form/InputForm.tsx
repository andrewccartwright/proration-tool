import React, { useEffect, useState } from 'react';
import '../../css/InputForm.css';
import DateInput from './DateInput';

const InputForm = (props: {setInput: Function}) => {

    const [hasCouponRate, setHasCouponRate] = useState<boolean>(false);

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const startDate = (document.getElementById('start-date') as HTMLInputElement).value;
        let startTime = (document.getElementById('start-time') as HTMLInputElement).value;
        if ((document.getElementById('start-pm') as HTMLInputElement).checked) {
            let hours = Number(startTime.split(':')[0]);
            hours += 12;
            startTime = hours.toString() + ':' + startTime.split(':')[1];
        }
        
        const periodStartDate = (document.getElementById('period-start-date') as HTMLInputElement).value;
        let periodStartTime = (document.getElementById('period-start-time') as HTMLInputElement).value;
        if ((document.getElementById('period-start-pm') as HTMLInputElement).checked) {
            let hours = Number(periodStartTime.split(':')[0]);
            hours += 12;
            periodStartTime = hours.toString() + ':' + periodStartTime.split(':')[1];
        }
        const endDate = (document.getElementById('end-date') as HTMLInputElement).value;
        let endTime = (document.getElementById('end-time') as HTMLInputElement).value;
        if ((document.getElementById('end-pm') as HTMLInputElement).checked) {
            let hours = Number(endTime.split(':')[0]);
            hours += 12;
            endTime = hours.toString() + ':' + endTime.split(':')[1];
        }
        const numUsers = (document.getElementById('num-users') as HTMLInputElement).value;
        const price = (document.getElementById('price') as HTMLInputElement).value;
        const couponRate = document.getElementById('coupon-rate') !== null ? (document.getElementById('coupon-rate') as HTMLInputElement).value : undefined;

        if (!validateInput()) {
            window.alert('Please check your inputs');
            return;
        }

        const input = {
            startDate: startDate,
            startTime: startTime,
            periodStartDate: periodStartDate,
            periodStartTime: periodStartTime,
            endDate: endDate, 
            endTime: endTime,
            numUsers: Number(numUsers), 
            price: Number(price),
            couponRate: couponRate
        };

        props.setInput(input);

    }

    const validateInput = () => {
        let isValid = true;
        const dates = Array.from(document.getElementsByClassName('date') as HTMLCollectionOf<HTMLInputElement>);
        const times = Array.from(document.getElementsByClassName('time') as HTMLCollectionOf<HTMLInputElement>);
        const numbers = Array.from(document.getElementsByClassName('number') as HTMLCollectionOf<HTMLInputElement>);
        const dateRegex = /[0-9]{1,2}[/-][0-9]{1,2}[/-][0-9]{4}/;
        const dateRegex2 = /[0-9]{4}[/-}[0-9]{1,2}[/-][0-9]{1,2}/;
        const timeRegex = /[0-9]{1,2}:[0-9]{1,2}/;
        const numberRegex = /[0-9]/;
        
        dates.forEach((date) => {
            if (!dateRegex.test(date.value) && !dateRegex2.test(date.value)) {
                isValid = false;
            }
        });

        times.forEach((time) => {
            if (!timeRegex.test(time.value)) {
                isValid = false;
            }
        })

        numbers.forEach((number) => {
            if (!numberRegex.test(number.value)) {
                isValid = false;
            }
        })

        return isValid;
    }

    const getStartDate = (): string[] => {
        let now = new Date();
        // now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

        let date = now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear();
        let time = now.getHours() % 12 + ':' + (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes())

        if (now.getHours() >= 12) {
            let radio1 = document.getElementById('start-am') as HTMLInputElement;
            let radio2 = document.getElementById('start-pm') as HTMLInputElement;
            radio1.checked = false;
            radio2.checked = true;
        } 

        return [date, time];
    }

    const toggleCouponRate = () => {
        setHasCouponRate(!hasCouponRate);
    }

    useEffect(() => {
        const defaultStartValue = getStartDate();
        // const defaultEndValue = getEndOfMonth();
        const startDate = document.getElementById('start-date') as HTMLInputElement;
        const startTime = document.getElementById('start-time') as HTMLInputElement;
        // const endDate = document.getElementById('end-date') as HTMLInputElement;

        startDate.value = defaultStartValue[0]; 
        startTime.value = defaultStartValue[1];
        // endDate.value = defaultEndValue.toISOString().slice(0,-1);
    }, []);

    return (
        <div id='input-form-div'>
            <form id='input-form' name='inputForm' onSubmit={handleSubmit}>
                <DateInput />
                <div id='number-input-section'>
                    <label htmlFor='num-users'>Enter the number of users:</label>
                    <input type='number' id='num-users' name='num-users' className='input-field number' required min="0" />

                    <label htmlFor='price'>Enter the price per user:</label>
                    <input type='number' id='price' name='price' className='input-field number' required min="0" step="0.01" />

                    {
                        hasCouponRate && <div id='coupon-rate-section'>
                            <label htmlFor='coupon-rate'>Enter the coupon rate:</label>
                            <div>
                                <input type='number' id='coupon-rate' name='coupon-rate' defaultValue={0} className='input-field number' min="0" max="100" step="0.001" />%
                            </div>
                        
                        </div>
                    }

                    <div id='coupon-rate-toggle'>
                        {!hasCouponRate ? <span className='btn btn-secondary' onClick={toggleCouponRate}>Add coupon rate</span> : <span className='btn btn-secondary' onClick={toggleCouponRate}>Remove coupon rate</span>}
                    </div>
                </div>
                
                

                

                <input id='run-button' type='submit' value='Run' className='btn btn-primary' />
            </form>
        </div>
    )
}

export default InputForm;