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
