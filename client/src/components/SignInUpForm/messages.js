const signInMessages = [
    "Welcome back! We missed you (but not in a creepy way) 😊.",
    "Well, well, look who’s logging in! We kept your seat warm 🪑.",
    "You’re back! Did you forget your password or just us? 🤔",
    "Welcome back! Time to get your awesome on 💪.",
    "Hey! You’re here. We’ll assume you’re saving the world 🌟.",
    "Look who’s logging in! We saved your spot 🪑.",
    "Back again? We knew you couldn’t stay away! 🙌",
    "Hey there! We were just talking about you 👋.",
    "Hey! You’re here. We were just about to send out a search party 🚨.",
    "Welcome back! We were just about to send out a search party 🚨.",
];

export const signInMessageProvider = () => {
    return signInMessages[Math.floor(Math.random() * signInMessages.length)];
}

const signUpMessages = [
    "Congratulations! You're officially less lonely 🎉.",
    "Your life just got a whole lot more awesome. You're welcome ✨.",
    "Hey there! Ready to tackle the world (or at least this site)? 🌍",
    "Congratulations! You’ve earned a PhD in Emojiology 🎓😂.",
    "Congrats! Your awesomeness level is now maxed out 🚀.",
    "Hooray! Another account to manage. Thanks a lot 🙄.",
    "Welcome to the club. We're not sure what we're doing either 🤷‍♂️.",
];

export const signUpMessageProvider = () => {
    return signUpMessages[Math.floor(Math.random() * signUpMessages.length)];
}