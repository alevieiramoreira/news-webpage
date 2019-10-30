    const mainUrl = 'https://newsapi.org/v2/top-headlines?country=br&apiKey=2f0002580b5a46eeb92ed9821d22ebc0';

    fetchAPI(mainUrl);

    const btnTech = document.getElementById('tech');

    const btnBussiness = document.getElementById('bussiness');

    const btnWorld = document.getElementById('world');

    const btnShowMore = document.getElementById('btnShow');

    btnShowMore.onclick = function showContent(){
        btnShowMore.style.display = 'none';

       let article = document.querySelectorAll('.article');
        
       for (const i in article) {
            article[i].style.display = 'inline-flex';
       }
    }
 

    function switchCategory(category){
        let url = 'https://newsapi.org/v2/top-headlines?country=us&category='+ category +'&apiKey=2f0002580b5a46eeb92ed9821d22ebc0';
        
        fetchAPI(url);
    }

    function fetchAPI(url){   
        fetch(url)
            .then(response => response.json())
            .then( data => {
                fillListNews(data);

                fillMainNews(data);

                fillSubNews(data);
            })
    }

    function fillSubNews(data){
        let results = data.articles;

        results.slice(1, 3).map(prop =>{

            let subArticle = addElementClass('article', ['sub-article','white-txt', 'bold'] );
            let subArtTag = addElementClass('p', 'sub-article-tag');
            let subArtTxt = addElementClass('p', 'sub-article-txt');

            subArticle.setAttribute('style', `background-image: url("${prop.urlToImage}")`);

            subArtTag.innerHTML = prop.source.name;
            subArtTxt.innerHTML = prop.title;
        
            appendElement(subArticle, subArtTag);
            appendElement(subArticle, subArtTxt);
            appendElement(document.getElementById('container'), subArticle);
        })
        
    }

    function fillListNews(data){
        let results = data.articles; 
        
       results.slice(0, 6).map ((prop, index) =>{
            let article = addElementClass('article', 'article');
                img = addElementClass('img');
                artBody = addElementClass('div', 'article-body');
                artTag = addElementClass('div', 'article-tag');
                artCategory = addElementClass('div', 'article-category');
                p1 = addElementClass('p');
                p2 = addElementClass('p');
                p3 = addElementClass('p');

            if(index >= 3){
               article.style.display = "none";
            }

            img.src = prop.urlToImage;
            p1.innerHTML = prop.source.name;
            p2.innerHTML = 'Assunto';
            p3.innerHTML = prop.title;

            appendElement(article, img);
            appendElement(article, artBody);
            appendElement(artBody, artTag);
            appendElement(artTag, p1);
            appendElement(artCategory, p2);
            appendElement(artBody, p3);
            appendElement(document.getElementById('list'), article);

        })

       
    }

    function fillMainNews(data){
        let results = data.articles;

        results.slice(0, 1).map(prop =>{

            let mainArticle = addElementClass('div', 'main-article');
                mainArtTag = addElementClass('p', 'main-article-tag');
                mainArtTitle = addElementClass('h1', ['title', 'red-txt']);
                mainArtTxt = addElementClass('p', 'main-article-txt');

            mainArtTitle.innerHTML = prop.title;
            mainArtTag.innerHTML = prop.source.name;
            mainArtTxt.innerHTML = prop.description;
        
            appendElement(mainArticle, mainArtTag)
            appendElement(mainArticle, mainArtTitle);
            appendElement(mainArticle, mainArtTxt);

            appendElement(document.getElementById('container'), mainArticle);

        })
        
    }

    function addElementClass(element, className){
        let classify = createElement(element);
        
        if(Array.isArray(className) === true){
            for (let i = 0; i < className.length; i++) {
                classify.classList.add(className[i]);
            }
        }

        classify.classList.add(className);
        
        return classify;
    }

    function createElement(element){
        return document.createElement(element);
    }

    function appendElement(parent, child){
        return parent.appendChild(child);
    }
    

    
