import { useEffect, useState } from "react";
// import { getStartOfMonth, getEndOfMonth } from "../../controllers/HelperFunctions";

const Output = (props: {input: {startDate: string, startTime: string, periodStartDate: string, periodStartTime: string, endDate: string, endTime: string, numUsers: number, price: number, couponRate?: number}
}) => {
    const [error, setError] = useState<boolean>(false);
    let {startDate, startTime, periodStartDate, periodStartTime, endDate, endTime, numUsers, price} = props.input;
    let couponRate = props.input.couponRate;
    let start = new Date(startDate);

    const [prorationPerUser, setProrationPerUser] = useState<string>('');
    const [totalProration, setTotalProration] = useState<string>('');
    const [numDays, setNumDays] = useState<string>('');
    const [totalNumDays, setTotalNumDays] = useState<string>('');
    
    const calculateProration = () => {
        let time = getProratedPeriodInMs();

        if (time < 0) {
            window.alert('Start date is outside of period');
            setError(true);
        }
        else {
            setError(false);
        }

        let totalTime = getTotalPeriodInMs();
        const timeFraction = time / totalTime;

        setNumDays(round(time / 86400000).toFixed(2));
        setTotalNumDays(round(totalTime / 86400000).toFixed(2));
        
        const prorationPerUser = round(timeFraction * price);

        if (couponRate !== undefined) {
            couponRate = 1 - (couponRate / 100);
            calculateProrationWithCoupon(prorationPerUser);
        }
        else {
            setProrationPerUser(prorationPerUser.toFixed(2));
            setTotalProration(round(prorationPerUser * numUsers).toFixed(2));
        }
    }

    // const formatTime = (time: string): string => {
    //     let timeArr = time.split(':');
    //     let hours = timeArr[0];
    //     let minutes = timeArr[1];
        
    //     hours = Number(hours) < 10 ? '0' + hours : hours;
    //     minutes = Number(minutes) < 10 ? '0' + minutes : minutes;

    //     return hours + ':' + minutes;
    // }

    const calculateProrationWithCoupon = (prorationPerUser: number) => {
        setProrationPerUser((prorationPerUser * couponRate!).toFixed(2));
        setTotalProration(round(prorationPerUser * couponRate! * numUsers).toFixed(2));
    }

    const round = (num: number) => {
        return Math.round(num * 100) / 100;
    }

    const getProratedPeriodInMs = (): number => {
        let startOfProration = new Date(startDate);
        startOfProration.setHours(Number(startTime.split(':')[0]));
        startOfProration.setMinutes(Number(startTime.split(':')[1]));

        let endOfProration = new Date(endDate);
        endOfProration.setHours(Number(endTime.split(':')[0]));
        endOfProration.setMinutes(Number(endTime.split(':')[1]));

        let time = endOfProration.getTime() - startOfProration.getTime();
        return time;
    }

    const getTotalPeriodInMs = () => {
        let startOfPeriod = new Date(periodStartDate);
        startOfPeriod.setHours(Number(periodStartTime.split(':')[0]));
        startOfPeriod.setMinutes(Number(periodStartTime.split(':')[1]));

        let endOfPeriod = new Date(endDate);
        endOfPeriod.setHours(Number(endTime.split(':')[0]));
        endOfPeriod.setMinutes(Number(endTime.split(':')[1]));

        let totalTime = endOfPeriod.getTime() - startOfPeriod.getTime();

        if (totalTime < 0) {
            window.alert('The start date is after the end date');
            setError(true);
        }
        else {
            setError(false);
        }

        return totalTime;
    }

    useEffect(() => {
        if (start instanceof Date) {
            calculateProration();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, startTime, periodStartDate, periodStartTime, endDate, endTime, numUsers, price])

    return (
        <div>
            {
                !error && <div id='output-section'>
                    <p>Number of users: {numUsers}</p>
                    <p>Price per user: ${price}</p>
                    <p>Number of days in prorated period: {numDays}</p>
                    <p>Total number of days: {totalNumDays}</p>
                    {couponRate && <p>Coupon Rate: {couponRate}%</p>}
                    <p>Prorated amount per user: ${prorationPerUser}</p>
                    <p>Total proration: ${totalProration}</p>
                </div>
            }
            
        </div>
        
    )
}

export default Output;