export default {
    checkResponseForErrorEventsToEmit(response) {
        if (response.data && response.data.status === 'NotLoggedIn') {
            let event = new CustomEvent("NotLoggedIn");
            document.dispatchEvent(event);
        }
    }
}