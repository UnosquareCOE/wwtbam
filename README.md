# Overview

This application permits users to play `who wants to be a millionaire` over the internet and leveraging technologies like websockets and webrtc. 

## Problem Definition

For events it can be fun to play interactive games; however with the trend towards remote working this can be difficult to facilitate in a seamless way. The objective of this application is to provide an interface that allows a `presenter` to run a game in the same way that the TV show is run.


## Requirements

MoSCoW prioritization, also known as the MoSCoW method or MoSCoW analysis, is a popular prioritization technique for managing requirements. M - Must have, S - Should have, C - Could have, W - Will not have.

### Must Have
- A user must be able to create/update an account.
- An account user must be able to start a game as an owner
- A game must permit guests to join a lobby as participants
- A game must facilitate a participant selection round to identify the contestant.
- A game must permit contestant to answer questions.
- A game must have a set number of questions that can be organised by 3 difficulties.
- A game must handle showing questions and allowing selection.
- A game must handle correct guesses and progression through the questions.
- A game must support use of the 50/50 lifeline.
- A game must be marked as lost when an incorrect guess is made.
- A game must facilitate milestones 
- A game must permit a maximum of 2 minutes per question.

### Should Have
- A game should use real time communication for game updates.
- A game should skip participant selection if there is only 1 participant.

### Could Have
- An owner could be able to set a presenter
- A game could support use of the ask a friend lifeline.
- A game could support use of the ask the audience lifeline.

### Will Not Have
- The system will not track historical games and trends.
- The system will not tracked connected users and prompt for inactivity/lost connections.
- The system will not support an interface to administrate questions.


## Domain Model Diagram

This diagram demostrates the main domains for WWTBAM, along with a short description on how they interact.

```mermaid
erDiagram
    Game }|--}| Question : contains
    Contestant o|-- }| Lifeline: owns
    Game o|-- }| Lifeline: owns
    Milestone }|-- || Game: contains
    Question }|-- || Milestone: associated
    Account ||--}| Session : creates
    Session ||--}| Game: creates
    Participant }|--|| Session : joins
    Contestant ||-- }| Participant : is
    Presenter ||-- }| Participant : is
    Contestant }|-- || Game : plays
    Presenter }|-- || Game : directs
```

## Entity Relationship Diagram

This diagram demostrates the table structure along with the cardinality that is used for the WWTBAM databse.

```mermaid
erDiagram
    accounts {
        int id pk
        text first_name
        text last_name
        text email
        timestamp created_date
        timestamp modified_date
        text password
    }
    sessions {
        guid id pk
        text name
        text password
        timestamp created_date
        timestamp modified_date
        int owner_id 
    }
    game_participant_types {
        int id pk
        text description
    }
    participants {
        guid id pk
        text name
        text avatar
        timestamp created_date
        int session_id
    }
    game_types {
        int id pk
        text description
    }
    games {
        int id pk
        timestamp created_date
        int session_id
        int game_type_id
    }
    lifelines {
        int id pk
        text description 
    }
    question_difficulty_types {
        int id pk
        text description
        int value
    }
    questions {
        int id pk
        text title
        int question_difficulty_type_id
    }
    game_lifelines {
        int id pk
        int game_id fk
        int lifeline_id fk
    }
    game_milestones {
        int id pk
        int game_id fk
        int sequence
    }
    game_participants {
        int id pk
        int game_id fk
        int participant_id fk
        int game_participant_type_id fk
    }
    game_questions {
        int id pk
        int sequence
        int game_id fk
        int question_id fk
    }
    question_items {
        int id pk
        text value
        bit outcome
        int question_id fk
    }
    game_participant_questions {
        int id pk
        timestamp created_date
        int game_participant_id fk
        int game_question_id fk
        int selection_id fk
    }
    accounts ||--|{ sessions : ""
    sessions ||--|{ participants: ""
    sessions ||--|{ games: ""
    participants ||--|{ game_participants: ""
    game_participants ||--|{ game_participant_questions: ""
    question_items ||--|{ game_participant_questions: ""
    questions ||--|{ question_items : ""
    question_difficulty_types ||--|{ questions : ""
    questions ||--|{ game_questions: ""
    game_questions ||--|{ game_participant_questions : ""
    games ||--|{ game_questions : ""
    game_types ||--|{ games : ""
    games ||--|{ game_lifelines: ""
    lifelines ||--|{ game_lifelines : ""
    games ||--|{ game_questions : ""
    games ||--|{ game_participants : ""
    games ||--|{ game_milestones : ""
    game_participant_types ||--|{ game_participants: ""


```

## API Design
