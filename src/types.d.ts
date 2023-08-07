type Place = {
    value: string;
    label: string;
};

type User = {
    id: string;
    birth_date: import('firebase/firestore').Timestamp;
    city: Place;
    country: Place;
    name: string;
};

type FormValues = {
    user_name: string;
    birth_date: Date;
    country: Place;
    city: Place;
};
