import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163704.png",
            name: "Alice Johnson",
            subtext: "Hey, how are you doing?",
            to: '1'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163705.png",
            name: "Bob Smith",
            subtext: "Can we reschedule our meeting?",
            to: '2'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163706.png",
            name: "Charlie Brown",
            subtext: "Don't forget the event tomorrow.",
            to: '3'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163707.png",
            name: "Daisy Miller",
            subtext: "I'll send the documents later.",
            to: '4'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163708.png",
            name: "Ethan Davis",
            subtext: "Are you coming to the party?",
            to: '5'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163709.png",
            name: "Fiona Green",
            subtext: "I loved your recent post!",
            to: '6'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163710.png",
            name: "George Clark",
            subtext: "What time is the meeting?",
            to: '7'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163711.png",
            name: "Hannah Lewis",
            subtext: "Can you help me with my project?",
            to: '8'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163712.png",
            name: "Isaac Wilson",
            subtext: "Let's catch up this weekend.",
            to: '9'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163713.png",
            name: "Jack Harris",
            subtext: "Good morning! How's it going?",
            to: '10'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163714.png",
            name: "Katie Robinson",
            subtext: "Did you finish the assignment?",
            to: '11'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163715.png",
            name: "Liam Walker",
            subtext: "Can we have a quick call?",
            to: '12'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163716.png",
            name: "Mia Hall",
            subtext: "Thank you for your help!",
            to: '13'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163717.png",
            name: "Nathan Young",
            subtext: "I need your advice on something.",
            to: '14'
        },
        {
            img: "https://cdn-icons-png.flaticon.com/128/17163/17163718.png",
            name: "Olivia King",
            subtext: "Let's meet up for coffee.",
            to: '15'
        }
    ],
};


const contactsSlice = createSlice({
    name: 'contacts',   
    initialState,
    reducers: {},
});


export default contactsSlice.reducer;
