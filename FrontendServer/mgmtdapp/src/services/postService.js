import fetchDataService from './fetchDataService';
import { setLoadingState } from '../actions/loadingActions';

const postServiceSingleton = {
    serviceInstance : null,
    getPostServiceInstance : function getPostServiceInstance(store){
        if(!this.serviceInstance){
            this.serviceInstance = new PostService(store);
            return this.serviceInstance;
        } else {
            return this.serviceInstance;
        }
    }
};

class PostService {
    store = null;

    constructor(store){
        if(!store){
            throw new Error("No store was passed to the constructor of the FetchDataService.");    
        }
        this.store = store;
    }

    postData(destinationURL, dataObject){

        this.setApplicationToLoading();

        fetch(destinationURL, {
            method: 'POST',
            body: JSON.stringify(dataObject),
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
                },
            mode: 'cors'
            }).then(async (response)=>{
                let responseMessage = await response.text();
                switch(response.status){
                    case 200:
                        this.displayMessage(responseMessage);
                        fetchDataService.getFetchDataService().fetchAllUserData();
                        break;
                    case 401:
                        this.displayErrorMessage(responseMessage);
                        break;
                    case 500:
                        this.displayErrorMessage(responseMessage);
                        break;
                    default:
                        this.displayErrorMessage();
                }
            }).finally(()=>{
                this.setApplicationToDone();
            });
    }

    displayMessage(message="Success!"){
        window.Materialize.toast(message, 2000);
    };

    displayErrorMessage(err = "An unknown error occured."){
        window.Materialize.toast(`<span class="post-service-error-toast">${err}</span>`, 3000)
    }

    setApplicationToLoading(){
        this.store.dispatch(setLoadingState(true));
    }

    setApplicationToDone(){
        this.store.dispatch(setLoadingState(false));
    }
}

export default postServiceSingleton;