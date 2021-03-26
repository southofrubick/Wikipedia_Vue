const app = Vue.createApp({
    data(){
        return {
            firstBook: true,
            showButtons: true,
            isLoading: true,
            showButtonText: 'Show buttons',
            books:[
                { title: 'The final empire', author: 'Brandon Sanderson', releaseDate: 2006, 
                url: 'https://en.wikipedia.org/wiki/Mistborn:_The_Final_Empire', 
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Mistborn-cover.jpg/220px-Mistborn-cover.jpg',
                description: 'lol',
                URL: 'Mistborn:_The_Final_Empire', Page: '6216269' },
                { title: 'The once and future king', author: 'T. H. White', releaseDate: 1958, 
                url: 'https://en.wikipedia.org/wiki/The_Once_and_Future_King', 
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Once-and-Future-King-FC.jpg/220px-Once-and-Future-King-FC.jpg'
                ,description: 'lol',
                URL: 'The_Once_and_Future_King', Page: '418332' },
                { title: 'The way of kings', author: 'Brandon Sanderson', releaseDate: 2010, 
                url: 'https://en.wikipedia.org/wiki/The_Way_of_Kings', 
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/TheWayOfKings.png/220px-TheWayOfKings.png'
                ,description: 'lol',
                URL: 'The_Way_of_Kings', Page: '24957772' },
                { title: 'Do androids dream of electic sheep', author: 'Philip K. Dick', releaseDate: 1968, 
                url: 'https://en.wikipedia.org/wiki/Do_Androids_Dream_of_Electric_Sheep%3F', 
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/DoAndroidsDream.png/190px-DoAndroidsDream.png'
                ,description: 'lol',
                URL: 'Do_Androids_Dream_of_Electric_Sheep', Page: '23284' },
                { title: 'Coraline', author: 'Neil Gaiman', releaseDate: 2002, 
                url: 'https://en.wikipedia.org/wiki/Coraline', 
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Coraline.jpg/220px-Coraline.jpg'
                ,description: 'lol',
                URL: 'Coraline', Page: '78799' },
                { title: 'Stranger in a strange land', author: 'Robert A. Heinlein', releaseDate: 1961, 
                url: 'https://en.wikipedia.org/wiki/Stranger_in_a_Strange_Land', 
                image: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Stranger_in_a_Strange_Land_Cover.jpg/220px-Stranger_in_a_Strange_Land_Cover.jpg'
                ,description: 'lol',
                URL: 'Stranger_in_a_Strange_Land', Page: '53595' },
                { title: 'The old man and the sea', author: 'Ernest Hemingway', releaseDate: 1952, 
                url: 'https://en.wikipedia.org/wiki/The_Old_Man_and_the_Sea', 
                image: 'https://upload.wikimedia.org/wikipedia/en/7/73/Oldmansea.jpg'
                ,description: 'lol',
                URL: 'The_Old_Man_and_the_Sea', Page: '161502' }
            ],
            index: 0
        }
    },
    methods: {
        changeTitle(){
            if(this.books[this.index].description == 'lol'){
                console.log('Saving new description')
                this.books[this.index].description = document.getElementById("bookDesc").innerHTML
            }
            if(this.firstBook == true){
                this.firstBook = false
            }
            this.updateIndex()
            this.getCurrentDesc(this.books[this.index].URL, this.books[this.index].Page)
        },
        updateIndex(){
            if(this.index < this.books.length - 1)
                this.index++
            else{
                this.isLoading = false;
                this.showButtons = true;
                this.index = 0
            }
        },
        toggleShowButtons(){
            this.showButtons = !this.showButtons
        },
        getCurrentDesc(url, page){
            let vm = this;
            if (this.books[this.index].description == 'lol'){
            let newDesc = Promise.resolve(getJSONfromURL(url, page).then(function(data){
                showDescription(data)
                vm.showButtons = true;
            }));
            }else{
                showDescription(this.books[this.index].description)
                this.showButtons = true;
            }
        },
        toggleButton(){
            if(this.isLoading)
                this.showButtons = false;
        }
    },
    mounted: function(){
        if (this.books[this.index].description == 'lol'){
        let newDesc = Promise.resolve(getJSONfromURL(this.books[this.index].URL, this.books[this.index].Page).then(function(data){
            showDescription(data);
        }));
        }else{
            showDescription(this.books[this.index].description)
        }
    }
})

app.mount('#app')

function showDescription(data){
    document.getElementById("bookDesc").innerHTML = data;
}

async function getJSONfromURL(url, page){
    let descURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=';
    let descPostfix = '&origin=*';

    let newURL = descURL + url + descPostfix;

    let bookDescription = 'lol';
    let desc = await $.getJSON(newURL, function(data){
        let newDescription = data.query.pages[page].extract;
        bookDescription = newDescription;
    })
    return bookDescription;
}