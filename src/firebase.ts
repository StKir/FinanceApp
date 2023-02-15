import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	// apiKey: process.env.REACT_APP_APIKEY,
	// authDomain: process.env.REACT_APP_AUTHDOMAIN,
	// projectId: process.env.REACT_APP_PROJECTID,
	// storageBucket: process.env.REACT_APP_STORAGEBUCKET,
	// messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
	// appId: process.env.REACT_APP_APPID
	apiKey: 'AIzaSyCEg8pUL4bwouXMUV_3fGgN49NpGIcEkFc',
	authDomain: 'cryptoauth-c4482.firebaseapp.com',
	projectId: 'cryptoauth-c4482',
	storageBucket: 'cryptoauth-c4482.appspot.com',
	messagingSenderId: '405641609896',
	appId: '1:405641609896:web:28eb07f51c74fdeb58789d'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
