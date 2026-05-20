$(function () {
  
  setTimeout(function () {
    $("#splash-logo").fadeOut('slow');
    $("#splash").fadeOut('slow', function () {
      $('body').addClass('appear');
    });
  }, 1500);

  //    ハンバーガー
  $(".toggle_btn").on("click", function () {
    $("header").toggleClass("open");
  });

  $(".header-wrap__item a").on("click", function () {
    $("header").removeClass("open");
  });

  // pagetop
  const pageTop = $('#js-page-top');
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 100) {
      pageTop.addClass('is-show');    
    } else {
      pageTop.removeClass('is-show'); 
    }
  });

  pageTop.on('click', function (e) {
    e.preventDefault(); 
    $('body, html').animate({ scrollTop: 0 }, 500); 
  });


  // アコーディオン
  $('.service-detail__faq-a').hide();
  $('.service-detail__faq-q').on('click', function () {
    const $content = $(this).next('.service-detail__faq-a');

    if ($content.is(':hidden')) {
      $('.service-detail__faq-a').not($content).slideUp(300);
      $('.service-detail__faq-q').not(this).removeClass('is-active');

      $content.slideDown(300);
      $(this).addClass('is-active');
    } else {
      $content.slideUp(300);
      $(this).removeClass('is-active');
    }
  });

  // news
  if ($('.sub-news').length) {
    
    const $newsItems = $('.sub-news__item'); 
    const $paginationNumbers = $('#js-news-pagination-numbers');
    const $prevBtn = $('.news-prev');
    const $nextBtn = $('.news-next');
    
    const itemsPerPage = 8; 
    let currentPage = 1;

  
    let currentFilter = {
      type: 'all', 
      value: 'all' 
    };

    
    function getFilteredItems() {
      if (currentFilter.type === 'category') {
        return $newsItems.filter('.-' + currentFilter.value);
      } else if (currentFilter.type === 'archive') {
        return $newsItems.filter(`[data-date="${currentFilter.value}"]`);
      }
      return $newsItems; 
    }

    
    function updateNewsDisplay() {
      const $filteredItems = getFilteredItems();
      const totalFilteredItems = $filteredItems.length;
      const pageCount = Math.ceil(totalFilteredItems / itemsPerPage);

      
      $newsItems.hide();

      
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      $filteredItems.slice(startIndex, endIndex).fadeIn(300);

      
      $paginationNumbers.empty(); 

      
      if (pageCount <= 1) {
        $('.sub-news__pagination').hide();
        $newsItems.hide();
        $filteredItems.show();
      } else {
        $('.sub-news__pagination').show();
        
        
        for (let i = 1; i <= pageCount; i++) {
          let activeClass = (i === currentPage) ? 'active' : '';
          $paginationNumbers.append(`<button class="sub-news__page-num ${activeClass}" data-page="${i}">${i}</button>`);
        }
      }

      if (currentPage === 1 || pageCount <= 1) {
        $prevBtn.addClass('disabled').prop('disabled', true);
      } else {
        $prevBtn.removeClass('disabled').prop('disabled', false);
      }

      if (currentPage === pageCount || pageCount === 0 || pageCount <= 1) {
        $nextBtn.addClass('disabled').prop('disabled', true);
      } else {
        $nextBtn.removeClass('disabled').prop('disabled', false);
      }
    }

    
    updateNewsDisplay();

    
    $paginationNumbers.on('click', '.sub-news__page-num', function () {
      currentPage = parseInt($(this).attr('data-page'), 10);
      updateNewsDisplay();

      
      $('html, body').animate({
        scrollTop: $('.sub-news').offset().top - 40
      }, 400);
    });

    
    $prevBtn.on('click', function () {
      if (!$(this).hasClass('disabled') && currentPage > 1) {
        currentPage--;
        updateNewsDisplay();
        $('html, body').animate({ scrollTop: $('.sub-news').offset().top - 40 }, 400);
      }
    });

    
    $nextBtn.on('click', function () {
      const $filteredItems = getFilteredItems();
      const pageCount = Math.ceil($filteredItems.length / itemsPerPage);

      if (!$(this).hasClass('disabled') && currentPage < pageCount) {
        currentPage++;
        updateNewsDisplay();
        $('html, body').animate({ scrollTop: $('.sub-news').offset().top - 40 }, 400);
      }
    });

    
    $('[data-sidebar-filter]').on('click', function (e) {
      e.preventDefault(); 
      const filterValue = $(this).attr('data-sidebar-filter');
      
      if (filterValue === 'all') {
        currentFilter = { type: 'all', value: 'all' };
      } else {
        currentFilter = { type: 'category', value: filterValue };
      }
      
      currentPage = 1; 
      updateNewsDisplay();
    });

    
    $('[data-sidebar-archive]').on('click', function (e) {
      e.preventDefault(); 
      const archiveValue = $(this).attr('data-sidebar-archive');
      
      currentFilter = { type: 'archive', value: archiveValue };
      currentPage = 1; 
      updateNewsDisplay();
    });

    
    const urlParamsNews = new URLSearchParams(window.location.search);
    const archiveParam = urlParamsNews.get('archive');
    const categoryParam = urlParamsNews.get('category');

    if (archiveParam) {
      currentFilter = { type: 'archive', value: archiveParam };
      currentPage = 1;
      updateNewsDisplay();
    } else if (categoryParam) {
      currentFilter = { type: 'category', value: categoryParam };
      currentPage = 1;
      updateNewsDisplay();
    }
    
  }

  
  if ($('.works-list-section').length) {
    
    const $worksItems = $('.works-card'); 
    const $categoryButtons = $('.works-list-section__category-btn');
    const $paginationArea = $('.works-list-section__pagination');
    
    const itemsPerPageWorks = 6; 
    let currentWorksPage = 1;
    let currentWorksFilter = 'all'; 

    
    function getFilteredWorksItems() {
      if (currentWorksFilter === 'all') {
        return $worksItems;
      }
      return $worksItems.filter('.' + currentWorksFilter);
    }

    
    function updateWorksDisplay() {
      const $filteredWorks = getFilteredWorksItems();
      const totalFilteredWorks = $filteredWorks.length;
      const pageCountWorks = Math.ceil(totalFilteredWorks / itemsPerPageWorks);

      
      $worksItems.hide();

      
      const startIndex = (currentWorksPage - 1) * itemsPerPageWorks;
      const endIndex = startIndex + itemsPerPageWorks;
      $filteredWorks.slice(startIndex, endIndex).fadeIn(300);

      
      const $pageNumbers = $paginationArea.find('.pagination-num');
      const $prevArrow = $paginationArea.find('.pagination-arrow.prev');
      const $nextArrow = $paginationArea.find('.pagination-arrow.next');

      
      $pageNumbers.each(function () {
        const pageNum = parseInt($(this).text(), 10);
        if (pageNum <= pageCountWorks) {
          $(this).show(); 
          if (pageNum === currentWorksPage) {
            $(this).addClass('active');
          } else {
            $(this).removeClass('active');
          }
        } else {
          $(this).hide(); 
        }
      });

      
      if (pageCountWorks <= 1) {
        $paginationArea.hide();
      } else {
        $paginationArea.show();
      }

      
      if (currentWorksPage === 1) {
        $prevArrow.css('visibility', 'hidden'); 
      } else {
        $prevArrow.css('visibility', 'visible');
      }

      if (currentWorksPage === pageCountWorks || pageCountWorks === 0) {
        $nextArrow.css('visibility', 'hidden');
      } else {
        $nextArrow.css('visibility', 'visible');
      }
    }

    
    updateWorksDisplay();

  
    $categoryButtons.on('click', function () {
      
      $categoryButtons.removeClass('active');
      $(this).addClass('active');

  
      currentWorksFilter = $(this).attr('data-filter');
      currentWorksPage = 1; 

      updateWorksDisplay();
    });


    $paginationArea.on('click', '.pagination-num', function () {
      currentWorksPage = parseInt($(this).text(), 10);
      updateWorksDisplay();

      
      $('html, body').animate({
        scrollTop: $('.works-list-section').offset().top - 80
      }, 400);
    });

    
    $paginationArea.on('click', '.pagination-arrow.prev', function () {
      if (currentWorksPage > 1) {
        currentWorksPage--;
        updateWorksDisplay();
        $('html, body').animate({ scrollTop: $('.works-list-section').offset().top - 80 }, 400);
      }
    });

    
    $paginationArea.on('click', '.pagination-arrow.next', function () {
      const $filteredWorks = getFilteredWorksItems();
      const pageCountWorks = Math.ceil($filteredWorks.length / itemsPerPageWorks);

      if (currentWorksPage < pageCountWorks) {
        currentWorksPage++;
        updateWorksDisplay();
        $('html, body').animate({ scrollTop: $('.works-list-section').offset().top - 80 }, 400);
      }
    });

    
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');

    if (filterParam) {
      $categoryButtons.removeClass('active');
      const $targetBtn = $(`.works-list-section__category-btn[data-filter="${filterParam}"]`);
      
      if ($targetBtn.length > 0) {
        currentWorksFilter = filterParam;
        currentWorksPage = 1;
        $targetBtn.addClass('active');
        updateWorksDisplay();
      }
    }
  }
});