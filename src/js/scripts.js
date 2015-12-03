(function () {
  
  if (window.matchMedia("(max-width: 767px)").matches) {
    var footerItems = document.querySelectorAll(".page-footer__item");
    
    if (footerItems.length > 0) {
      for (var i=0; i<footerItems.length; i++) {
        initFooterItem(footerItems[i]);
      }
    }
  }
  
  function initFooterItem(container) {
    var itemHeader = container.querySelector(".page-footer__item-header");
    
    if (itemHeader) {
      
      itemHeader.addEventListener("click", function (event) {
        event.preventDefault();
        
        itemHeader.classList.toggle("page-footer__item-header--opened");

        var itemContent = itemHeader.parentElement.querySelector(".page-footer__item-content");
        if (itemContent) {
          itemContent.classList.toggle("page-footer__item-content--opened");
        }
      });
    }    
  }
  
})();