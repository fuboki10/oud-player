const askForPermissionToReceiveNotifications = async () => {
    try {
      messaging.onMessage((payload) => {
        console.log('Message received. ', payload);
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: payload.notification.icon,
          image: payload.notification.image
      });
      });
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log('Granted Token : ', token);
      
      return token;
    } catch (error) {
      console.error(error);
    }
  }
  askForPermissionToReceiveNotifications()
  console.log("ana hna fe fcm.js")