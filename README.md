# PhilNITS tryhard (v1.0.0)

### About:
    A pdf file manager specifically made for PhilNITS past FE questionnaires

### Features:
    - PDF viewer
    - Auto-pair answer keys (To be implemented)
    - Scan all files for keywords (To be implemented)
    - Practice mode (To be implemented)
    - Save previous session (To be implemented)

### Setting Up
    1. Clone the repo
        HTTPS: git@github.com:Ellydhore/philnits-tryhard.git
        SSH: git@github.com:Ellydhore/philnits-tryhard.git

    2. Running a Local Development Server
        To view the web app in your browser, you need to start a local development server. 
        You can use one of the following methods, depending on your setup:

        Option 1: Using Python (Built-in HTTP Server)
            1. navigate to the main directory of philnits-tryhard.
            2. open the directory in terminal.
            3. run a python server using either of the commands below.
        ```
        python3 -m http.server 8080
        python -m http.server 8080
        ```
            4. open your browser and go the URL displayed in the terminal.

        Option 2: Using Live Server in VS Code
            1. install the live server extension in VS Code.
            2. open philnits-tryhard directory in VS Code.
            3. right-click on the index html file and select open with Live Server.

        Option 3: Using Node.js (with npm)
            1. ensure you have Node.js installed.
            2. open a terminal in the philnits-tryhard directory.
            3. run the following command.
         ```
        npx http-server
         ```   
            4. open your browser and go the URL displayed in the terminal.

### File Structure
    Warning: Avoid renaming the pdf files
    -(main directory)/
        -FE
            -Answers/                       Contains all the PDF FE Answer Keys (2011 - 2024)
                -(Answers).pdf
            -Questionnaires/                Contains all the PDF FE Questionnaires (2011 - 2024)
                -(Questionnaires).pdf
                -list_files.ps1             (Windows) Scans the current folder and lists all the files to questionnaire.txt
                -list_files.sh              (Linux) Scans the current directory and lists all the files to questionnaire.txt
        -Program                            
            -css/
                -(Styling).css
            -html/
                -index.html                 Main HTML file
            -javascript/
                -(Script).js
            -answers.json                   Answer keys in json form (2011 - 2024)
            -cit_logo.png                   
            -history.json                   Save previous session(ex. save last opened file and practice session) 
            -questionnaire_list.txt         List of all questionnaires files inside FE/Questionnaires/ (2011- 2024) 
            -scan_result.txt               List of files scanned using keywords
