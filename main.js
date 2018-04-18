var $firstImg = $('#wrapper > img:nth-child(1)').clone(true)
var $lastImg = $('#wrapper > img:last-child').clone(true)
$('#wrapper').append($firstImg)     //克隆第一张到最后
$('#wrapper').prepend($lastImg)     //克隆最后一张到第一
$(wrapper).css({ transform: 'translateX(-300px)' })
var btnLength = $('#btn > button').length
var current = 0;
var index = 0;

$('#btn > button').on('click', (e) => {
    index = $(e.currentTarget).index()
    seamlessCarousel(index)
})
$('#nextAndPre > #next').on('click', () => {    //点击下一张
    index++;if (index > btnLength - 1) index = 0;seamlessCarousel(index)
})
$('#nextAndPre > #previous').on('click', () => {    //点击上一张
    index--; if (index < 0) index = btnLength - 1; seamlessCarousel(index)
})
var timer = setInterval(()=>{
    index++;if (index > btnLength - 1) index = 0;seamlessCarousel(index)
},1000)
$('.container').on('mouseenter',()=>{   //鼠标进入暂停轮播
    window.clearInterval(timer)
})
$('.container').on('mouseleave',()=>{   //鼠标离开继续轮播
    timer = setInterval(()=>{
        index++;if (index > btnLength - 1) index = 0;seamlessCarousel(index)
    },1000)
})
function seamlessCarousel(index) { //无缝轮播函数
    if (current + 1 === btnLength && index === 0) {     //如果是最后一张点击第一张
        $(wrapper).css({ transform: `translateX(${-(btnLength + 1) * 300}px)` })
            .one('transitionend', function () {
                $(wrapper).hide()
                    .offset()
                $(wrapper).css({
                    transform: `translateX(${-(index + 1) * 300}px)`,
                }).show()
            })
    } else if (current === 0 && index === btnLength - 1) {  //如果是第一张点击最后一张
        $(wrapper).css({ transform: `translateX(${0}px` })
            .one('transitionend', function () {
                $(wrapper).hide()//动画结束隐藏，移位，再显示
                    .offset()
                $(wrapper).css({
                    transform: `translateX(${-(index + 1) * 300}px)`,
                }).show()
            })
    } else {
        $(wrapper).css({ transform: `translateX(${-(index + 1) * 300}px)` })
    }
    current = index;
}


