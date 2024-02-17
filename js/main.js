/* ===================================================================
 * Monica 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {
    
    'use strict';
    
    const cfg = {
        
        // MailChimp URL
        mailChimpURL : 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6' 
        
    };


   /* preloader
   * -------------------------------------------------- */
  const ssPreloader = function() {
    
        const siteBody = document.querySelector('body');
        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        html.classList.add('ss-preload');
        
        window.addEventListener('load', function() {
            html.classList.remove('ss-preload');
            html.classList.add('ss-loaded');
            
            preloader.addEventListener('transitionend', function afterTransition(e) {
                if (e.target.matches('#preloader'))  {
                    siteBody.classList.add('ss-show');
                    e.target.style.display = 'none';
                    preloader.removeEventListener(e.type, afterTransition);
                }
            });
        });

    }; // end ssPreloader


   /* mobile menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const mainNavWrap = document.querySelector('.s-header__nav');
        const siteBody = document.querySelector('body');

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(e) {
            e.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {

            link.addEventListener("click", function(event) {

                // at 900px and below
                if (window.matchMedia('(max-width: 900px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 900px
            if (window.matchMedia('(min-width: 901px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains('is-clicked')) toggleButton.classList.remove('is-clicked');
            }
        });

    }; // end ssMobileMenu

//     /* header fixed top on scroll
//     * ------------------------------------------------------ */
//    (function() {
//     const scrollto = (el) => {
//         let header = select('#header')
//         let offset = header.offsetHeight
    
//         if (!header.classList.contains('header-scrolled')) {
//           offset -= 16
//         }
    
//         let elementPos = select(el).offsetTop
//         window.scrollTo({
//           top: elementPos - offset,
//           behavior: 'smooth'
//         })
//       }

//     let selectHeader = select("#header")
//     if (selectHeader) {
//       let headerOffset = selectHeader.offsetTop
//       let nextElement = selectHeader.nextElementSibling
//       const headerFixed = () => {
//         if (headerOffset - window.scrollY <= 0) {
//           selectHeader.classList.add("fixed-top")
//             nextElement.classList.add("scrolled-offset")
//         } else {
//           selectHeader.classList.remove("fixed-top")
//             nextElement.classList.remove("scrolled-offset")
//         }
//       }
//       window.addEventListener("load", headerFixed)
//       onscroll(document, headerFixed)
//     }});

    // header fixed on top scroll y <= 0
    const ssHeaderFixed = function() {
            
            const header = document.querySelector('#header');
            if (!header) return;
            let headerOffset = header.offsetTop;
            let nextElement = header.nextElementSibling;
            window.addEventListener('scroll', function() {
                
                if (headerOffset - window.scrollY <= 0) {
                    header.classList.add('fixed-top');
                    nextElement.classList.add('scrolled-offset');
                }
                else {
                    header.classList.remove('fixed-top');
                    nextElement.classList.remove('scrolled-offset');
                }
    
            });

    }; // end ssHeaderFixed


    const specialtiesSlider = function() {

        const prevButton = document.querySelector('.menublock-btn-prev');
        const nextButton = document.querySelector('.menublock-btn-next');
        const firstSlide = document.querySelector('.menublock-btn-first');
        const lastSlide = document.querySelector('.menublock-btn-last');
        const mSlider = document.querySelector('.s-menublock__slider');            
        if (!(mSlider)) return;

        const slider = new Swiper(mSlider, {

            slidesPerView: 1,
            pagination: {
                // el: '.swiper-pagination',
                clickable: true,
                navigation: {
                    nextEl: '.menublock-btn-next',
                    fisrtEL: '.menublock-btn-first',
                    prevEl: '.menublock-btn-prev',
                    lastEl: '.menublock-btn-last',
                }
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 680px
                681: {
                    slidesPerView: 2,
                    spaceBetween: 44
                },
                // when window width is > 1100px
                1101: {
                    slidesPerView: 3,
                    spaceBetween: 50
                },
                // when window width is > 1400px
                1401: {
                    slidesPerView: 3,
                
                    spaceBetween: 60
                },
            }
        });

        prevButton.addEventListener('click', function() {
            if (slider.activeIndex === 0) {                    
              // At the beginning of the slider
              slider.slideTo(slider.slides.length - 1); // Go to the last slide
              console.log('keakhir');
            } else {
                console.log(slider.activeIndex);
                slider.slidePrev();
            }
        });
          
        nextButton.addEventListener('click', function() {
            if (slider.activeIndex === slider.slides.length - 1) {
              // At the end of the slider
              slider.slideTo(0); // Go to the first slide
            } else {
                console.log(slider.activeIndex);
                console.log(slider.slides.length);
                console.log();

              slider.slideNext();
            }
        });
        firstSlide.addEventListener('click', function() {
            slider.slideTo(0);
        });
        lastSlide.addEventListener('click', function() {
            slider.slideTo(slider.slides.length - 1);
        });
        
    }; // end specialtiesSlider
    specialtiesSlider();
    
    // const sweetalert = function() {
    //     const cvBtn = document.querySelector('#CvBtn');
    //     if (!cvBtn) return;

    //     cvBtn.addEventListener('click', function() {
    //         Swal.fire({
    //             title: "The Internet?",
    //             text: "That thing is still around?",
    //             icon: "info"
    //         });
    //     });
    // };

   /* mailchimp form
    * ---------------------------------------------------- */ 
    const ssMailChimpForm = function() {

        const mcForm = document.querySelector('#mc-form');

        if (!mcForm) return;

        // Add novalidate attribute
        mcForm.setAttribute('novalidate', true);

        // Field validation
        function hasError(field) {

            // Don't validate submits, buttons, file and reset inputs, and disabled fields
            if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

            // Get validity
            let validity = field.validity;

            // If valid, return null
            if (validity.valid) return;

            // If field is required and empty
            if (validity.valueMissing) return 'Please enter an email address.';

            // If not the right type
            if (validity.typeMismatch) {
                if (field.type === 'email') return 'Please enter a valid email address.';
            }

            // If pattern doesn't match
            if (validity.patternMismatch) {

                // If pattern info is included, return custom error
                if (field.hasAttribute('title')) return field.getAttribute('title');

                // Otherwise, generic error
                return 'Please match the requested format.';
            }

            // If all else fails, return a generic catchall error
            return 'The value you entered for this field is invalid.';

        };

        // Show error message
        function showError(field, error) {

            // Get field id or name
            let id = field.id || field.name;
            if (!id) return;

            let errorMessage = field.form.querySelector('.mc-status');

            // Update error message
            errorMessage.classList.remove('success-message');
            errorMessage.classList.add('error-message');
            errorMessage.innerHTML = error;

        };

        // Display form status (callback function for JSONP)
        window.displayMailChimpStatus = function (data) {

            // Make sure the data is in the right format and that there's a status container
            if (!data.result || !data.msg || !mcStatus ) return;

            // Update our status message
            mcStatus.innerHTML = data.msg;

            // If error, add error class
            if (data.result === 'error') {
                mcStatus.classList.remove('success-message');
                mcStatus.classList.add('error-message');
                return;
            }

            // Otherwise, add success class
            mcStatus.classList.remove('error-message');
            mcStatus.classList.add('success-message');
        };

        // Submit the form 
        function submitMailChimpForm(form) {

            let url = cfg.mailChimpURL;
            let emailField = form.querySelector('#mce-EMAIL');
            let serialize = '&' + encodeURIComponent(emailField.name) + '=' + encodeURIComponent(emailField.value);

            if (url == '') return;

            url = url.replace('/post?u=', '/post-json?u=');
            url += serialize + '&c=displayMailChimpStatus';

            // Create script with url and callback (if specified)
            var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
            var script = window.document.createElement( 'script' );
            script.src = url;

            // Create global variable for the status container
            window.mcStatus = form.querySelector('.mc-status');
            window.mcStatus.classList.remove('error-message', 'success-message')
            window.mcStatus.innerText = 'Submitting...';

            // Insert script tag into the DOM
            ref.parentNode.insertBefore( script, ref );

            // After the script is loaded (and executed), remove it
            script.onload = function () {
                this.remove();
            };

        };

        // Check email field on submit
        mcForm.addEventListener('submit', function (event) {

            event.preventDefault();

            let emailField = event.target.querySelector('#mce-EMAIL');
            let error = hasError(emailField);

            if (error) {
                showError(emailField, error);
                emailField.focus();
                return;
            }

            submitMailChimpForm(this);

        }, false);

    }; // end ssMailChimpForm


   /* alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(e) {
                if (e.target.matches('.alert-box__close')) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add('hideit');

                    setTimeout(function() {
                        box.style.display = 'none';
                    }, 500)
                }
            });
        })

    }; // end ssAlertBoxes



    /* Back to Top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {

        const pxShow = 900;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });

    }; // end ssBackToTop


   /* smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function() {

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssMailChimpForm();
        ssAlertBoxes();
        ssMoveTo();
        ssHeaderFixed();
        // sweetalert();
        

    })();

})(document.documentElement);


