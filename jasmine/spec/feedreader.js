/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is the second test - it tests to make sure that each feed
         * in the allFeeds variable has a URL defined and that the URL is not empty.
         */
        it('have url', function() {
            for (feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* This is the third test - it tests to make sure that each feed
         * in the allFeeds variable has a name defined and that the name is not empty.
         */
        it('have name', function() {
            for (feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* This is the second test suite - This suite is all about the menu
    * element visibility.
    */
    describe('The menu', function () {
        let bodyElement;
        beforeEach(function() {
            bodyElement = $('body');
        })
        
        /* This is the first test - it tests to make sure that
         * the menu element is hidden by default.
         */
        it('is initailly hidden', function() {
            expect(bodyElement.hasClass('menu-hidden')).toBe(true);
        })

        /* This is the second test - it tests to make sure that
         * the menu changes when the menu icon is clicked. 
         */
        it('should change its visibility when its icon is clicked', function() {
            const menuIcon = $('.menu-icon-link');

            menuIcon.trigger('click');
            expect(bodyElement.hasClass('menu-hidden')).toBe(false);

            menuIcon.trigger('click');
            expect(bodyElement.hasClass('menu-hidden')).toBe(true);
        })
    })
        

    /* This is the third test suite - This suite is all about 
     * the Initial Entries values.
    */
    describe('Initial Entries', function() {
        /* This is the first test - it tests to make sure that
         * the loadFeed function is called and completes its work, 
         * and there is at least a single .entry element within the .feed container. 
         */
        beforeEach(function(done) {
            loadFeed(0, function() { done(); });
        })

        it('has at least one entry', function(done) {
            const enteryElementWithFeedElement = $('.feed .entry');
            expect(enteryElementWithFeedElement.length).toBeGreaterThan(0);
            done();
        })
    })
        

    /* This is the fourth test suite - This suite is all about 
     * New Feed Selection 
    */
    describe('New Feed Selection', function() {
        /* This is the first test - it tests to make sure that
         * a new feed is loadedby the loadFeed function that 
         * the content actually changes. 
         */
        let feeds;
        let updateFeed;
        beforeEach(function(done) {
            feeds = $('.feed').html();
            loadFeed(1, function() { 
                updateFeed = $('.feed').html();
                done(); 
            });
        })

        it('has new feed loaded', function(done) {
            expect(updateFeed).not.toBe(feeds);
            done();
        })
    })
}());
