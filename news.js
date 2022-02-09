function call(cate) {
    var subcate = ""
    if(cate!=='all'){
        subcate = `&category=${cate}`
     
    }
    $.ajax({
        type: 'GET',
        url: `https://newsapi.org/v2/top-headlines?country=kr&apiKey=cded017a336843099d467369774dd0ce${subcate}`,
        dataType: 'json',
         beforeSend:function (){
            $('#content').append('<div class="loading">로딩 중...</div>')
        },
        complete: function () {
            $('#content .loading').remove()
        },
        timeOut:2000,
        success: function (getdata) {
            console.log(getdata)
            usedata(getdata)
        },
        error: function (xhr) {
            alert(xhr.status + '/' + xhr.errorText)
        }
    })
}
call('all')
function usedata(data) {
    $('#content ul').remove()
    var elem = `<ul>`
    for (let i in data.articles) {
        elem += `<li>`
        elem += `<h2>${data.articles[i].title}</h2>`
        elem += `<img src="${data.articles[i].urlToImage}" alt="">`
        elem += `<p>${data.articles[i].description}</p>`
        elem += `<div>${data.articles[i].author}</div>`
        elem += `</li>`
    }
    elem += `</ul>`
    $('#content').append(elem)
}

$('.tabtit a').on('click', function () {
    var category = $(this).attr('href')
        call(category)
    return false
})
