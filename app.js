const spoilersArray = document.querySelectorAll('[data-spoilers]')

if (spoilersArray.length > 0) {
    const spoilerSort = Array.from(spoilersArray).filter(function (item, index, elem) {
        return item
    })

    if (spoilerSort.length > 0) {
        showSpoilers(spoilerSort)
    }

    function showSpoilers(spoilersArray) {
        spoilersArray.forEach(spoilersBlock => {
            spoilersBlock.classList.add('_init')
            showSpoilerBody(spoilersBlock)
            spoilersBlock.addEventListener('click', setSpoilerAction)
        })
    }

    function showSpoilerBody(spoilersBlock) {
        const spoilerBtn = spoilersBlock.querySelectorAll('[data-spoiler]')
        if (spoilerBtn.length > 0) {
            spoilerBtn.forEach(spoilerBtn => {
                if (!spoilerBtn.classList.contains('_active')) {
                    spoilerBtn.nextElementSibling.hidden = true
                }
            })
        }
    }

    function setSpoilerAction(e) {
        const el = e.target
        if (el.hasAttribute('data-spoiler') || el.closest('[data-spoiler]')) {
            const spoilerBtn = el.hasAttribute('data-spoiler') ? el : el.closest('[data-spoiler]')
            const spoilersBlock = spoilerBtn.closest('[data-spoilers]')
            if (!spoilersBlock.querySelectorAll('._slide').length) {
                spoilerBtn.classList.toggle('_active')
                _slideToggle(spoilerBtn.nextElementSibling, 500)
            }
            e.preventDefault()
        }
    }
}

let _slideUp = (target, duration = 500) => {
    if (target.classList.contains("_slide")) return
    target.classList.add("_slide")
    let style = target.style
    style.transitionProperty = "height, margin, padding"
    style.transitionDuration = `${duration}ms`
    style.height = `${target.offsetHeight}px`
    target.offsetHeight
    style.overflow = "hidden"
    style.height = 0
    style.paddingTop = 0
    style.paddingBottom = 0
    style.marginTop = 0
    style.marginBottom = 0

    setTimeout(() => {
        target.hidden = true;
        [
            "height",
            "padding-top",
            "padding-bottom",
            "margin-top",
            "margin-bottom",
            "overflow",
            "transition-duration",
            "transition-property",
        ].forEach(e => style.removeProperty(e))
        target.classList.remove("_slide")
    }, duration)

}


let _slideDown = (target, duration = 500) => {
    if (target.classList.contains("_slide")) return
    target.classList.add("_slide")
    if (target.hidden) target.hidden = false
    let style = target.style
    let height = target.offsetHeight
    style.overflow = "hidden"
    style.height = 0
    style.paddingTop = 0
    style.paddingBottom = 0
    style.marginTop = 0
    style.marginBottom = 0
    target.offsetHeight
    style.transitionProperty = "height, margin, padding"
    style.transitionDuration = `${duration}ms`
    style.height = `${height}px`;

    [
        "padding-top",
        "padding-bottom",
        "margin-top",
        "margin-bottom",
    ].forEach(e => style.removeProperty(e))

    setTimeout(() => {
        [
            "height",
            "overflow",
            "transition-duration",
            "transition-property",
        ].forEach(e => style.removeProperty(e))
        target.classList.remove("_slide")
    }, duration)
}


let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return _slideDown(target, duration)
    }
    _slideUp(target, duration)
}