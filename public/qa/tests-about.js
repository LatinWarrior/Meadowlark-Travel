/**
 * Created by luis_blanco on 11/20/2014.
 */

suite('"About" Page Tests', function(){
    test('page should contain link to contact page', function(){
        assert($('a[href="/contact"]').length);
    });
});


