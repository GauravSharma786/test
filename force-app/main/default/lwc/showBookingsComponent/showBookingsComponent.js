import { LightningElement, track, wire, api } from 'lwc';
import getMovies from '@salesforce/apex/ShowBookingsController.getMovies';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createBookingAndLineitems from '@salesforce/apex/ShowBookingsController.createBookingAndLineitems';
import pubSub from 'c/pubsubComponent';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
import userId from '@salesforce/user/Id';

export default class ShowBookingsComponent extends NavigationMixin(LightningElement) {
    @track selectedSeatsWithCategory;
    @track recordId;
    @track moviePosterId;
    @track seatDetails;
    @track totalAmount = 0;
    @track todayDate = new Date().toISOString().substring(0, 10);
    @track bookedSeats = [];
    @track subquery;
    @track currentUser = userId;

    @track movieObj = {
        Id: '',
        Name: '',
        Show_StartTime__c: '',
        image: ''
    };

    connectedCallback() {
        let categoryprice;
        pubSub.subscribe("sendseats", value => {
            console.log('seatvalue', value);
            this.selectedSeatsWithCategory = JSON.parse(JSON.stringify(value));
            console.log('this.seatRecordObj', this.selectedSeatsWithCategory);
            this.fillSeatDetails();
        });
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
        this.recordId = this.urlStateParameters.movieId || null;
        this.moviePosterId = this.urlStateParameters.moviePosterId || null;
        this.getMoviesRecords();
    }

    fillSeatDetails() {
        console.log('OUTPUT : ');
        let allSeatsDetails = [];
        let totalAmount = 0;
        for (let key in this.selectedSeatsWithCategory) {
            console.log('OUTPUT : ', this.selectedSeatsWithCategory[key]);

            if (this.selectedSeatsWithCategory.hasOwnProperty(key) && this.selectedSeatsWithCategory[key].length > 0) {
                let seats = this.selectedSeatsWithCategory[key];
                let obj = {
                    type: key,
                    price: seats[0].categoryprice,
                    seatCount: seats.length,
                    amount: seats[0].categoryprice * seats.length
                }
                totalAmount += obj.amount;
                allSeatsDetails.push(obj);
            }
        }
        console.log('OUTPUT2 : ');
        this.totalAmount = totalAmount;
        this.seatDetails = JSON.parse(JSON.stringify(allSeatsDetails));
    }

    getMoviesRecords() {
        console.log('this.recordId 2', this.recordId);
        getMovies({ recordId: this.recordId }).then(result => {
            console.log('result', result);
            this.movieObj.Id = result[0].Id;
            this.movieObj.Name = result[0].Name;
            this.movieObj.Show_StartTime__c = result[0].Show_StartTime__c;
            this.movieObj.image = 'https://starinfotech-developer-edition.ap24.force.com/BookMyShow/sfc/servlet.shepherd/version/download/' + this.moviePosterId;
            console.log('movieObj', this.movieObj);
        }).catch(error => {
            console.log('error', error);
        });
    }

    navigateToWebPage() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/BookMyShow/s/'
            },
        }
        );

    }

    checkDate(event) {
        if (this.movieObj != null) {
            let dt;
            dt = new Date();
            dt.setDate(dt.getDate() + 7);

            let previousdate;
            previousdate = new Date();
            previousdate.setDate(dt.getDate() - previousdate.getDate());
            let currentDate = new Date().toISOString().substring(0, 10);

            console.log('dt = ', dt, event.target.value);
            if (event.target.value > (dt.toISOString().substring(0, 10))) {
                this.showToast('Error', 'you do not select after next 7 days date', 'error', 'dismissable');
                event.target.value = '';
            } else if (event.target.value < currentDate) {
                this.showToast('Error', 'you do not select before current date', 'error', 'dismissable');
                event.target.value = '';
            } else {
                this.todayDate = event.target.value;
                console.log('This todaydate', this.todayDate);
                let obj = {
                    date: this.todayDate,
                    movieId: this.movieObj.Id
                }
                console.log('Pubsub Obj', obj);
                pubSub.publish("sendbookingdataPublish", obj);

            }
        } else {
            this.showToast('Error', 'Please select your movie first', 'error', 'dismissable');
            event.target.value = '';
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

    handleClick() {
        let start = new Date(this.todayDate).setMilliseconds(this.movieObj.Show_StartTime__c + 19800000);
        let end = new Date().getTime() + 19800000;
        console.log('Start', start);
        console.log('End  ', end);
        if (start < end) {
            this.showToast('Error', 'You can book seats now because your movie has started', 'error', 'dismissable');
        } else {
            let bookingLineItems = [];

            for (let key in this.selectedSeatsWithCategory) {
                console.log('OUTPUT : ', this.selectedSeatsWithCategory[key]);
                if (this.selectedSeatsWithCategory.hasOwnProperty(key) && this.selectedSeatsWithCategory[key].length > 0) {
                    let seats = this.selectedSeatsWithCategory[key];
                    seats.forEach(element => {
                        let obj = {
                            Seat_Category__c: element.categoryid,
                            Seat__c: element.id,
                            Amount__c: element.categoryprice * seats.length,
                        }
                        bookingLineItems.push(obj);
                    });
                }
            }
            console.log('bookingLineItems1 =', bookingLineItems);

            let movies = {
                Movie__c: this.movieObj.Id,
                ShowTime__c: this.movieObj.Show_StartTime__c,
                Booking_Date__c: this.todayDate,
                Status__c: 'Upcoming'
            }

            createBookingAndLineitems({ booking: movies, bookingLineItems: bookingLineItems, selectedDate: this.todayDate }).then(result => {
                console.log('result', result);
                if (result = 'SUCCEEDED') {
                    this.showToast('Success', 'Your movie show is sucessfullly booked', 'success', 'dismissable');
                } else if (result = 'UPDATED') {
                    this.showToast('Success', 'Your movie booking show is sucessfullly Updated', 'success', 'dismissable');
                } else {
                    this.showToast('Error', 'Please fill your booking details', 'error', 'dismissable');
                }
            }).catch(error => {
                console.log('error', error);
            });

            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: '/BookMyShow/s/my-booking'
                },
            }
            );
        }

    }

}



    // handleDateChange(event) {
    //     if (this.movieObj != null) {
    //         let bookingDate = event.target.value;
    //         console.log('DATE : ', bookingDate);
    //     } else {
    //         this.showToast('Error', 'Please select your movie first', 'error', 'dismissable');
    //     }


    // }



// getMovieShowByDate({ bookingdate: this.todayDate }).then(result => {
                //     console.log('result', result);
                //     this.subquery = result;

                //     console.log('this.movie id : ', this.movieObj[0].Id);
                //     let newArray = result.filter(item => {
                //         return item.Movie__c == this.movieObj[0].Id;
                //     });
                //     console.log('newArray', newArray);
                //     let bookingSeatsRecords = [];
                //     // newArray.forEach(element => {
                //     //     let bookingSeatsRecord = {
                //     //         ownerId: '',
                //     //         seatId: []
                //     //     }
                //     //     bookingSeatsRecord.ownerId = element.OwnerId;
                //     //     element.Seat_Booking_Line_Items__r.forEach(element => {
                //     //         bookingSeatsRecord.seatId.push(element.Seat__c);

                //     //     });
                //     //     bookingSeatsRecords.push(bookingSeatsRecord);
                //     // });
                //     newArray.forEach(element => {
                //         let ownerId = element.OwnerId;
                //         element.Seat_Booking_Line_Items__r.forEach(element => {
                //             bookingSeatsRecords.push({
                //                 ownerId: ownerId,
                //                 seatId: element.Seat__c
                //             });
                //         });
                //     });
                //     console.log('seat Ids', bookingSeatsRecords);

                //     pubSub.publish("sendbookingdataPublish", bookingSeatsRecords);

                //     // bookingSeatsRecords.forEach(element => {
                //     //     console.log('Seat Id is : ', element.seatId);
                //     // });
                // }).catch(error => {
                //     console.log('error', error);
                // });