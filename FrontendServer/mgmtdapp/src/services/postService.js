import fetchDataService from './fetchDataService';

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
        console.log(fetchDataService);
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
            }).then((response)=>{
                console.log(response);
                fetchDataService.getFetchDataService().fetchAllUserData();
                // Throw error if status code is anything but 200.
            }).catch((err)=>{
                this.displayErrorMessage(err);
            }).finally(()=>{
                this.setApplicationToDone();
            });
    }

    displayErrorMessage(err){
        console.log(err);
        console.log(fetchDataService);
        console.log("Display Error Message.");
    }

    setApplicationToLoading(){
        console.log("Set Application to Loading.");
    }

    setApplicationToDone(){
        console.log("Set Application to Done.");
    }
}

// Fetch-call
// setStateToLoading
// display warnings
// setStateToDone

export default postServiceSingleton;