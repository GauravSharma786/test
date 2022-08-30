import { LightningElement, wire, track } from 'lwc';
import getMoviesAttachments from '@salesforce/apex/MovieController.getMoviesAttachments';
import { NavigationMixin } from 'lightning/navigation';
import POSTER_LOGO from '@salesforce/resourceUrl/Poster';

export default class movieListComponent extends NavigationMixin(LightningElement) {

    @track allMovies;
    @track allSeats = [];
    poster = POSTER_LOGO;

    @wire(getMoviesAttachments)
    handleMovies({ data, error }) {
        if (data) {
            console.log('data  :-  ', data);
            let movies = [];
            data.forEach(currentItem => {
                let obj = {};
                obj = JSON.parse(JSON.stringify(currentItem));
                obj.imageurl = 'https://starinfotech-developer-edition.ap24.force.com/BookMyShow/sfc/servlet.shepherd/version/download/' + obj.movieId;
                movies.push(obj);
            });

            console.log('OUTPUT : ', JSON.parse(JSON.stringify(movies)));
            this.allMovies = JSON.parse(JSON.stringify(movies));
        } else if (error) {
            console.log('error', error);
        }

    }

    navigateToWebPage(event) {
        let movieId = event.currentTarget.dataset.id;
        console.log('OUTPUT movie name Id: ', movieId);
        let moviePosterId = event.currentTarget.dataset.movieposterid;
        console.log('OUTPUT movie poster Id is the : ', moviePosterId);
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/BookMyShow/s/seat-booking?movieId=' + movieId + '&moviePosterId=' + moviePosterId
            },
        }
        );
    }

    // handleOnViewModel(){

    //     getSeatsRecord().then(result => {
    //         console.log('result',result);
    //         // this.allSeats = result;
    //         // console.log('result',this.allSeats);
    //         let seatsRecordList = [];
    //         result.forEach(currentItem => {
    //             let obj = {};
    //             obj = JSON.parse(JSON.stringify(currentItem)); 
    //             console.log('obj',obj);
    //             obj.seats = obj.Seats__r;
    //             console.log('obj.seats',obj.Seats__r);
    //             seatsRecordList.push(obj);
    //             console.log('seatsRecordList',seatsRecordList);
    //         });
    //         this.allSeats = JSON.parse(JSON.stringify(seatsRecordList));
    //         console.log('allseats',this.allSeats);
    //     }).catch(error => {
    //         console.log('error',error);
    //     });
    // }

}