import { LightningElement, wire, track, api } from 'lwc';
import getSeatsRecord from '@salesforce/apex/SeatBookingController.getSeatsRecord';
import { CurrentPageReference } from 'lightning/navigation';
import pubSub from 'c/pubsubComponent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import GoldLengthLabel from '@salesforce/label/c.Gold_Category_Length';
import PlatiumLengthLabel from '@salesforce/label/c.Platinum_Category_Length';
import SilverLengthLabel from '@salesforce/label/c.Silver_Category_Length';
import BronzeLengthLabel from '@salesforce/label/c.Bronze_Category_Length';
import { NavigationMixin } from 'lightning/navigation';

export default class SeatBookingComponent extends NavigationMixin(LightningElement) {

    currentPageReference = null;
    urlStateParameters = null;

    @track allSeats = [];
    movieId = null;
    moviePosterId = null;
    selectedSeatsWithCategory = {};
    seatRecords = [];
    @track bookedSeats = [];
    @track bookingSeatsArray = [];
    @track todayDate = new Date().toISOString().substring(0, 10);

    connectedCallback() {
        console.log('location.search', location.search);
        if (location.search == '') {
            window.location.href = '/BookMyShow/s/';
        }
        pubSub.subscribe("sendbookingdataPublish", value => {
            console.log('sendbookingdataPublish', value);
            this.checkBoookedSeats(value.movieId, value.date);
        })
    }

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
        if (currentPageReference) {
            this.urlStateParameters = currentPageReference.state;
            console.log('MoviePoster Id', this.urlStateParameters);
            this.setParametersBasedOnUrl();
        }
    }

    setParametersBasedOnUrl() {
        this.movieId = this.urlStateParameters.movieId || null
        this.moviePosterId = this.urlStateParameters.moviePosterId || null;

        console.log('this.movieId', this.movieId);
        console.log('this.moviePosterId', this.moviePosterId);
        this.checkBoookedSeats(this.movieId, this.todayDate);
    }

    handleClick(event, bookingSeatIds) {
        let seatId = event.currentTarget.dataset.id;
        let category = event.currentTarget.dataset.category;

        let obj = {
            id: seatId,
            name: event.currentTarget.dataset.name,
            categoryprice: event.currentTarget.dataset.categoryprice,
            categoryid: event.currentTarget.dataset.categoryid
        }
        if (event.currentTarget.classList.contains("selected-seat")) {
            event.currentTarget.classList.remove("selected-seat");

            if (this.selectedSeatsWithCategory.hasOwnProperty(category)) {
                const index = this.selectedSeatsWithCategory[category].findIndex(seat => seat.id === seatId);
                this.selectedSeatsWithCategory[category].splice(index, 1);
            }

        } else {

            event.currentTarget.classList.add("selected-seat");
            if (this.selectedSeatsWithCategory.hasOwnProperty(category)) {

                if (category == 'Gold' && this.selectedSeatsWithCategory[category].length < GoldLengthLabel) {
                    this.selectedSeatsWithCategory[category].push(obj);
                } else if (category == 'Platinum' && this.selectedSeatsWithCategory[category].length < PlatiumLengthLabel) {
                    this.selectedSeatsWithCategory[category].push(obj);
                } else if (category == 'Silver' && this.selectedSeatsWithCategory[category].length < SilverLengthLabel) {
                    this.selectedSeatsWithCategory[category].push(obj);
                } else if (category == 'Bronze' && this.selectedSeatsWithCategory[category].length < BronzeLengthLabel) {
                    this.selectedSeatsWithCategory[category].push(obj);
                }
                else {
                    event.currentTarget.classList.remove("selected-seat");
                    this.showToast('Error', 'You reached maximum seat limit of ' + category, 'error', 'dismissable');
                }

            } else {//first time case
                this.selectedSeatsWithCategory[category] = [obj];
            }

        }
        console.log('OUTPUT : ', this.selectedSeatsWithCategory);
        pubSub.publish("sendseats", this.selectedSeatsWithCategory);

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

    checkBoookedSeats(movieId, todaymoviedate) {
        console.log('Method');
        getSeatsRecord({ movieId: movieId, bookingDate: todaymoviedate }).then(result => {
            console.log('result', result);
            this.allSeats = JSON.parse(JSON.stringify(result));
            console.log('allSeats', JSON.parse(JSON.stringify(result)));
        }).catch(error => {
            console.log('error', error);
        });
    }

    // }
    // how to make a chrome extension app
    // @wire(searchContactList, { accountName: '$searchKey' })

    // @wire(getSeatsRecord, { movieId: '$this.movieId', date: '$this.todayDate' })
    // handleSeats({ data, error }) {
    //     if (data) {
    //         console.log('data', data);
    //         this.allSeats = JSON.parse(JSON.stringify(data));
    //         console.log('allseats', this.allSeats);

    //     } else if (error) {
    //         console.log('error', error);
    //     }
    //     this.checkBoookedSeats();
    // }

    // Show Booked seats By c/userBookingDetailComponent


    // console.log('Aaya : ', bookedSeatsIds);
    // let bookingSeatsArray = [];
    // this.allSeats.forEach(main => {
    //     let bookingSeatsRecord = {
    //         categoryId: main.Id,
    //         categoryName: main.Name,
    //         categoryPrice: main.Price__c,
    //         seatId: []
    //     }

    //     let categoryArrayBooking = [];
    //     main.Seats__r.forEach(seat => {
    //         let obj = {
    //             isBooked: false,
    //             seatId: seat.Id,
    //             seatName: seat.Name,
    //             styleClass: ''
    //         };
    //         if (bookedSeatsIds != null) {
    //             bookedSeatsIds.forEach(book => {
    //                 obj.styleClass = book.ownerId == userId ? 'booked-currentuser-seat' : 'booked-alluser-seat';
    //                 if (book.seatId == seat.Id) {
    //                     obj.isBooked = true;
    //                     return;
    //                 }
    //             });
    //         }

    //         bookingSeatsRecord.seatId.push(obj);
    //     });

    //     bookingSeatsArray.push(bookingSeatsRecord);
    // });
    // console.log(' all Booking Seats: ', bookingSeatsArray);


    // bookedSeatsBackgroundChanged(bookedSeats) {
    //     console.log('value of booked sdeats', bookedSeats);
    //     console.log('type of ', typeof (bookedSeats));
    //     // for (let index = 0; index < bookedSeats.length; index++) {
    //     //     let seat = bookedSeats[index];
    //     //     const seatId = this.template.querySelector('div[data-id=' + seat + ']');
    //     //     console.log('seatId', seatId);
    //     //     seatId.classList.add('booked-seat');
    //     //     console.log('seatId', seatId);
    //     //     console.log('seat : ', seat);
    //     //     // obj.contactCount = data[index].Contacts ? data[index].Contacts.length : 0;
    //     //     // accounts.push(obj);
    //     // }

    // }
}