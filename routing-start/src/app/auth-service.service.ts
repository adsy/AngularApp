export class authService{
    loggedIn = false;

    // Return a promise which will resolve the value of the loggedIn value after 800ms.
    isAuthenticated(){
        const promise = new Promise((resolve,reject)=>{
            setTimeout(() =>{
                resolve(this.loggedIn);
            },800)
        })

        return promise;
    }
    
    login(){
        this.loggedIn = true;
    }
    
    logout() {
        this.loggedIn = false;
    }
}