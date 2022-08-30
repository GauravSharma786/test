import { LightningElement, wire, track } from 'lwc';
import getUserBookingDetails from '@salesforce/apex/UserBookingDetailController.getUserBookingDetails';
import bookingStatusCanceled from '@salesforce/apex/UserBookingDetailController.bookingStatusCanceled';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class UserBookingDetailComponent extends LightningElement {
    @track bookingStages;
    allBookingRecords;

    @wire(getUserBookingDetails)
    userBookingDetails(result) {
        // let bookingsDetails;
        this.allBookingRecords = result;
        if (result.data) {
            console.log('Data of  booking', result.data);
            this.getAllTypesBookingDetails(result.data);
        } else if (result.error) {
            console.log('Error Of User Booking Component');
        }
    }
    showToast(title, message, varient, mode) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: varient,
            mode: mode
        });
        this.dispatchEvent(evt);
    }

    getAllTypesBookingDetails(seatBookings) {
        let bookingStage = {};
        seatBookings.forEach(obj => {
            let details = {
                id: obj.Id,
                movieName: obj.Movie__r.Name,
                totalAmount: obj.Total_Amount__c,
                totalSeatsCount: obj.Total_Seat__c,
                movieTime: obj.ShowTime__c,
                movieDate: obj.Booking_Date__c,
            }

            let keyName = obj.Status__c;
            let bookingLineItems = {};
            obj.Seat_Booking_Line_Items__r.forEach(lineItem => {
                if (bookingLineItems.hasOwnProperty(lineItem.Seat_Category__r.Name)) {
                    bookingLineItems[lineItem.Seat_Category__r.Name].push(lineItem);
                } else {
                    bookingLineItems[lineItem.Seat_Category__r.Name] = [lineItem];
                }
            })
            if (obj.Status__c == 'Upcoming' && obj.In_Progress__c) {
                keyName = 'InProgress'
            }
            details['bookingLineItems'] = bookingLineItems;

            if (bookingStage.hasOwnProperty(keyName)) {
                bookingStage[keyName].push(details);
            } else {
                bookingStage[keyName] = [details];
            }


        })
        this.bookingStages = bookingStage;
        console.log('bookingStage : ', this.bookingStages);

    }
    handleBookingCancelClick(event) {
        let bookingId = event.currentTarget.dataset.id;
        console.log('Booking Id', bookingId);
        bookingStatusCanceled({ bookingId: bookingId }).then(result => {
            console.log('RESULT', result);
            if (result = 'SUCCEEDED') {
                this.showToast('Success', 'Your Booking is sucessfullly Canceled', 'success', 'dismissable');
                refreshApex(this.allBookingRecords);
            } else {
                this.showToast('Error', 'Please fill your booking details', 'error', 'dismissable');
            }
        }).catch(error => {
            console.log('error', error);
        });

    }

}


        // let bookingStage = {};
        // seatBookings.forEach(obj => {
        //     let details = {
        //         movieName: obj.Movie__r.Name,
        //         totalAmount: obj.Total_Amount__c,
        //         totalSeatsCount: obj.Total_Seat__c,
        //         movieTime: obj.ShowTime__c,
        //         movieDate: obj.Booking_Date__c,
        //     }

        //     let keyName = obj.Status__c;
        //     let lineItems = {};
        //     obj.Seat_Booking_Line_Items__r.forEach(lineItem => {
        //         if (lineItems.hasOwnProperty(lineItem.Seat_Category__r.Name)) {
        //             lineItems[lineItem.Seat_Category__r.Name].push(lineItem);
        //         } else {
        //             lineItems[lineItem.Seat_Category__r.Name] = [lineItem];
        //         }
        //     })
        //     if (obj.Status__c == 'Upcoming' && obj.In_Progress__c) {
        //         keyName = 'InProgress'
        //     }
        //     details['lineItems'] = lineItems;
        //     bookingStage[keyName] = details;

        // })
        // //this.bookingStages.push(bookingStage);
        // this.bookingStages = bookingStage;

        // console.log('bookings Stage Console', this.bookingStages);

        // console.log('OUTPUT Bronze  : ', this.bookingStages.Upcoming.lineItems.Bronze);
        // console.log('OUTPUT Bronze  : ', this.bookingStages.InProgress.lineItems.Bronze);
        // console.log('OUTPUT Bronze  : ', this.bookingStages.Completed.lineItems.Bronze);