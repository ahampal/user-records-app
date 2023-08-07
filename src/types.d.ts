type Place = {
    value: string;
    label: string;
};

type User = {
    birth_date?: import('firebase/firestore').Timestamp;
    city?: Place;
    country?: Place;
    name?: string;
};

type UserWithRef = User & { docRef: DocumentReference<User, User> }

type FormValues = {
    user_name: string;
    birth_date: Date;
    country: Place;
    city: Place;
};
