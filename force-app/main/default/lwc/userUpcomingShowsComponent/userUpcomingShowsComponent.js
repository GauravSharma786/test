import { LightningElement, wire, track } from 'lwc';
import getUserUpcomingShowsDetails from '@salesforce/apex/UserBookingDetailController.getUserUpcomingShowsDetails';

export default class UserUpcomingShowsComponent extends LightningElement {
    @track bookingStages = [];

    @wire(getUserUpcomingShowsDetails)
    userBookingDetails({ data, error }) {
        // let bookingsDetails;
        if (data) {
            console.log('Data of  Upcoming booking of new Component', data);
            this.getUserUpcomingShows(data);
        } else if (error) {
            console.log('Error Of User Booking Component');
        }
    }

    getUserUpcomingShows(seatBookings) {
        console.log('hello', seatBookings);
        let bookingStage = [];
        seatBookings.forEach(element => {
            // element.seatBooking.forEach(obj => {
            let details = {
                id: element.seatBooking.Id,
                movieImage: 'https://starinfotech-developer-edition.ap24.force.com/BookMyShow/sfc/servlet.shepherd/version/download/' + element.movieId,
                movieName: element.seatBooking.Movie__r.Name,
                totalAmount: element.seatBooking.Total_Amount__c,
                totalSeatsCount: element.seatBooking.Total_Seat__c,
                movieTime: element.seatBooking.ShowTime__c,
                movieDate: element.seatBooking.Booking_Date__c,
            }
            this.bookingStages.push(details);
            // bookingStage.push(details);
        });

        // this.bookingStages.push([details]);
        console.log('bookingStage : ', this.bookingStages);
    }
}
// let keyName = obj.Status__c;
            // let bookingLineItems = {};
            // obj.Seat_Booking_Line_Items__r.forEach(lineItem => {
            //     if (bookingLineItems.hasOwnProperty(lineItem.Seat_Category__r.Name)) {
            //         bookingLineItems[lineItem.Seat_Category__r.Name].push(lineItem);
            //     } else {
            //         bookingLineItems[lineItem.Seat_Category__r.Name] = [lineItem];
            //     }
            // })
            // if (obj.Status__c == 'Upcoming' && obj.In_Progress__c) {
            //     keyName = 'InProgress'
            // }
            // details['bookingLineItems'] = bookingLineItems;

            // if (bookingStage.hasOwnProperty(keyName)) {
            //     bookingStage[keyName].push(details);
            // } else {
            //     bookingStage[keyName] = [details];
            // }


            // });