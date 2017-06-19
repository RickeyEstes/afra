require([
            'dojo/aspect',
            'JBrowse/Browser',
            'JBrowse/Store/SeqFeature/BAM',
            'JBrowse/Model/XHRBlob'
        ], function( aspect, Browser, BAMStore, XHRBlob ) {

// function distinctBins( features ) {
//     var bins = {};
//     features.forEach( function(f) {
//         bins[ f.data._bin ] = ( bins[ f.data._bin ] || 0 ) + 1;
//     });
//     return bins;
// }

describe( 'BAM with volvox-sorted.bam', function() {
              var b;
              beforeEach( function() {
                  b = new BAMStore({
                                       browser: new Browser({ unitTestMode: true }),
                                       bam: new XHRBlob('../data/raw/volvox/volvox-sorted.bam'),
                                       bai: new XHRBlob('../data/raw/volvox/volvox-sorted.bam.bai'),
                                       refSeq: { name: 'ctgA', start: 1, end: 500001 }
                                   });
              });

              it( 'constructs', function() {
                      expect(b).toBeTruthy();
                  });

              it( 'loads some data', function() {
                      var loaded;
                      var features = [];
                      var done;
                      aspect.after( b, 'loadSuccess', function() {
                          loaded = true;
                      });
                      b.getFeatures({ start: 0, end: 50000 },
                                 function( feature ) {
                                     features.push( feature );
                                 },
                                 function() {
                                     done = true;
                                 }
                               );
                      expect(features.length).toBeGreaterThan(1000);
                  });
});

describe( 'BAM with test_deletion_2_0.snps.bwa_align.sorted.grouped.bam', function() {
              var b;
              beforeEach( function() {
                  b = new BAMStore({
                      browser: new Browser({ unitTestMode: true }),
                      bam: new XHRBlob('../data/test_deletion_2_0.snps.bwa_align.sorted.grouped.bam'),
                      bai: new XHRBlob('../data/test_deletion_2_0.snps.bwa_align.sorted.grouped.bam.bai'),
                      refSeq: { name: 'Chromosome', start: 1, end: 20000 }
                  });
              });

              it( 'constructs', function() {
                      expect(b).toBeTruthy();
                  });

              it( 'loads some data', function() {
                      var loaded;
                      var features = [];
                      var done;
                      aspect.after( b, 'loadSuccess', function() {
                          loaded = true;
                      });
                      b.getFeatures({ start: 17000, end: 18000 },
                                 function( feature ) {
                                     features.push( feature );
                                 },
                                 function() {
                                     done = true;
                                 }
                               );
                      expect(features.length).toEqual(124);
                  });
});

describe( 'empty BAM', function() {
              var b;
              beforeEach( function() {
                  b = new BAMStore({
                      browser: new Browser({ unitTestMode: true }),
                      bam: new XHRBlob('../data/empty.bam'),
                      bai: new XHRBlob('../data/empty.bam.bai'),
                      refSeq: { name: 'Chromosome', start: 1, end: 20000 }
                  });
              });

              it( 'constructs', function() {
                      expect(b).toBeTruthy();
                  });

              it( "returns no data, but doesn't crash", function() {
                      var loaded;
                      var features = [];
                      var done;
                      aspect.after( b, 'loadSuccess', function() {
                          loaded = true;
                      });
                      b.getFeatures( { start: 0, end: 50000 },
                                 function( feature ) {
                                     features.push( feature );
                                 },
                                 function() {
                                     done = true;
                                 }
                               );
                      expect(features.length).toEqual( 0 );
                  });
});

describe( 'BAM with tests/data/final.merged.sorted.rgid.mkdup.realign.recal.bam', function() {
              var b;
              beforeEach( function() {
                  b = new BAMStore({
                      browser: new Browser({ unitTestMode: true }),
                      bam: new XHRBlob('../data/final.merged.sorted.rgid.mkdup.realign.recal.bam'),
                      bai: new XHRBlob('../data/final.merged.sorted.rgid.mkdup.realign.recal.bam.bai'),
                      refSeq: { end: 27682,
                                length: 27682,
                                name: "chr21_gl000210_random",
                                seqChunkSize: 80000,
                                start: 0
                              }
                  });
              });

              it( 'constructs', function() {
                      expect(b).toBeTruthy();
                  });

              it( 'loads some data', function() {
                      var loaded;
                      var features = [];
                      var done;
                      aspect.after( b, 'loadSuccess', function() {
                          loaded = true;
                      });
                      b.getFeatures({ start: 16589, end: 18964 },
                                 function( feature ) {
                                     features.push( feature );
                                 },
                                 function() {
                                     done = true;
                                 }
                               );
                      expect(features.length).toEqual(281);
                  });
});

// only run the cabone_test_2 if it's in the URL someplace
if( document.location.href.indexOf('extended_tests=1') > -1 ) {
    describe( 'BAM with carbone_test_2', function() {
                  var b;
                  beforeEach( function() {
                      b = new BAMStore({
                          browser: new Browser({ unitTestMode: true }),
                          bam: new XHRBlob('../../../data/carbone_test_2/RIB40_278_k51_cd_hit_est_sorted.bam'),
                          bai: new XHRBlob('../../../data/carbone_test_2/RIB40_278_k51_cd_hit_est_sorted.bam.bai'),
                          refSeq: { name: 'gi|338162049|dbj|BA000051.1|', start: 1, end: 5123684 }
                      });
                  });

                  it( 'loads some data', function() {
                          var loaded;
                          var features = [];
                          var done;
                          aspect.after( b, 'loadSuccess', function() {
                              loaded = true;
                          });

    // need 2:3905491-4019507 NODE_423_length_210786_cov_16.121635 3919331 3979772

                          b.getFeatures({ start: 3799999, end: 4049999 },
                                     function( feature ) {
                                         features.push( feature );
                                     },
                                     function() {
                                         done = true;
                                     }
                                   );
                          expect(features.length).toEqual(13);
                      });
    });

}

});

