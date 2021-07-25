const previousAddresses = [
    //cannonteamhomes.com_2021-07-25
    "1512 Elizabeth Creek Dr Little Elm, TX 750684", "3849 Belle Way Corinth, TX 762086", "816 Shady Meadow Dr Highland Village, TX 750774", "1932 Michelle Creek Dr Little Elm, TX 750684", "111 Palomino Ct Shady Shores, TX 762083", "612 Belmeade Ln Flower Mound, TX 750284",
    "5942 Deerwood Ln Frisco, TX 750364", "1071 E Oak Shores Dr Cross Roads, TX 762274", "917 Providence St Denton, TX 762054", "1513 Oakhollow Dr Corinth, TX 762105", "4821 New Hope Rd Aubrey, TX 762273", "1905 Doecrest Dr Denton, TX 762105", "3005 Hillside Dr Highland Village, TX 750774",
    "3809 Spinnaker Run Point Little Elm, TX 750684", "855 Sherry Ln S Krugerville, TX 762274",

    //www.dfwrealestate.com_2021-07-25
    "402 Highland Boulevard Oak Point, TX 75068", "7900 Stone Ridge Drive Northlake, TX 76247", "1812 Waddill Street Mc, Kinney, TX 75069", "101 Petes Lane Ponder, TX 76259", "109 College Street Farmersville, TX 75442",

    //portal.onehome.com_2021-07-25
    "1200 Wills Point Drive, Allen, TX 75013-8516", "1001 Fox Hill CourtCopper Canyon, TX 75077-8556",

    //www.trulia.com_2021-07-24
    "1003 Winchester Dr, Forney, TX", "1006 Holmes Ct, Allen, TX", "1029 Redwood Trl, Rockwall, TX", "161 Kirkhaven Dr, Rockwall, TX", "1040 Edgefield Ln, Forney, TX", "3000 Preston Club Dr, Sherman, TX", "1008 Hummingbird Ct, Forney, TX", "1717 Nicklaus Ct, Mckinney, TX", "2 Secluded Pond Cv, Princeton, TX", "1321 Canary Ln, Forney, TX",

    //www.trulia.com_2021-07-24
    "1627 Lake Travis Dr, Allen, TX", "416 Arbor Hills TrlBlue Ridge, TX", "3221 Wimberley Ln, Rockwall, TX", "1304 Stork Way, Forney, TX", "1421 Cedar Creek Dr, Anna, TX", "1157 Stonebridge Pass, Gunter, TX", "1115 Carson Dr, Allen, TX", "1401 Siena Ln, Rockwall, TX", "1411 Montebello Dr, Prosper, TX",

    //www.trulia.com_2021-07-24
    "17798 Sonesh, Nevada, TX", "1015 Everglades Dr, Allen, TX", "1319 Middleton Dr, Rockwall, TX", "4108 Oakhill Ct, Mckinney, TX", "901 Grapevine Ct, Prosper, TX", "312 Navajo TrlLake Kiowa, TX", "4033 Oyster Creek Ct, Prosper, TX", "1917 Baltimore Dr, Allen, TX",

    //www.trulia.com_2021-07-24
    "707 Wallace Rd, Gunter, TX", "14800 Tradewinds Cir, Forney, TX", "5074 E FM 552Royse City, TX", "104 Shoshone Cv, Gainesville, TX", "10933 Helms Trl, Forney, TX",

    //cannonteamhomes.com_2021-07-24
    "832 Mallard Trl Murphy, TX 750944", "1141 Cedar Springs Dr Prosper, TX 750784", "2834 Spring Creek Trl Celina, TX 750786", "921 Coral Ridge Ct Prosper, TX 750783", "2034 Saint Ives Dr Allen, TX 750134", "902 Autumn Ct Mc, Kinney, TX 750724", "1536 Vista Bend Dr Allen, TX 750024", "6003 Rathbone Dr Allen, TX 750023", "2101 Ironside Dr Plano, TX 750754", "718 Kinston Ct Wylie, TX 750984", "633 Creek View Dr Prosper, TX 750784",

    //portal.onehome.com_2021-07-24
    "14026 Tanglewood CourtFarmers Branch, TX 75234-3840", "6713 Creek Bend, Rowlett, TX 75089-4520",

    //portal.onehome.com_2021-07-23
    "19 Preakness Place RoadVan Alstyne, TX 75495-4800", "1001 Creek Bend, Carrollton, TX 75007-2787", "5101 Sweetgum Court, McKinney, TX 75071-8217",

    //portal.onehome.com_2021-07-23
    "3464 Estes Park Lane, McKinney, TX 75070-2688", "3824 Camino Drive, Plano, TX 75074-3444", "236 Crepe Myrtle Lane, Murphy, TX 75094-4329", "557 Leavalley Lane, Coppell, TX 75019-4079", "17327 Davenport Road, Dallas, TX 75248-1367", "1451 Benavites DriveLittle Elm, TX 75068-1616", "982 Crystal Lake Drive, Frisco, TX 75036-8865", "935 Southwood DriveHighland Village, TX 75077-6434",

    //portal.onehome.com_2021-07-23
    "2400 Wells Lane, McKinney, TX 75072-2301", "630 Alexandrite DriveOak Point, TX 75068-2275", "100 Macarthur Court, Irving, TX 75061", "715 Mustang Ridge Drive, Murphy, TX 75094-4410", "3604 White River Drive, Dallas, TX 75287-4812", "8221 Grand Canyon Drive, Plano, TX 75025-3986", "920 Dunleer Drive, Allen, TX 75013-5373", "7013 New Bury Court, Rowlett, TX 75089-4003", "3000 Kirwall DriveFlower Mound, TX 75028-5671", "2512 Russwood DriveFlower Mound, TX 75028-2347", "2605 Brookwood DriveFlower Mound, TX 75028-5115", "7909 Greenhollow Lane, Dallas, TX 75240-3707", "4433 Fairway Drive, Carrollton, TX 75010-1143", "1500 Crescent Valley Drive, Prosper, TX 75078-7047", "4605 Wild Honey CourtFlower Mound, TX 75022-1033", "4421 Vineyard Creek Drive, Grapevine, TX 76051-1131", "2609 Brittany Drive, Rowlett, TX 75088-1891", "401 Appalachian Way, McKinney, TX 75071-6461", "9804 Zembriski Drive, Plano, TX 75025-6504", "209 Clearcrest Drive, Allen, TX 75002-4636", "1900 Ring Teal LaneFlower Mound, TX 75028-7291", "2700 Woodstream Lane, McKinney, TX 75072-4334", "1900 Fieldstone Court, McKinney, TX 75072-5014", "2415 Sherbrooke Lane, McKinney, TX 75070-4767", "301 Green Acres Drive, Murphy, TX 75094-3273", "4470 Republic Drive, Frisco, TX 75034-6388", "1218 Ramsey Court, Allen, TX 75002-5774", "1600 Crown Point Road, McKinney, TX 75072-6352", "4509 Salerno Circle, Plano, TX 75093-7030", "801 Calaveras Court, Prosper, TX 75078-8464", "8304 Garnet Way, McKinney, TX 75072-5873", "6714 Lake Meadow Lane, Sachse, TX 75048-5571", "3609 Almond Lane, McKinney, TX 75070", "3404 Wickersham DriveFlower Mound, TX 75022-6714", "3511 Brookshire Run, Corinth, TX 76210-4171", "3100 Hidden Springs Drive, Corinth, TX 76210-4185", "6700 Leslie Court, Plano, TX 75023-1308", "18 Indian TrailHickory Creek, TX 75065-2920", "2812 Telluride Lane, Richardson, TX 75082-3870", "4108 Oak Hill Court, McKinney, TX 75071-5044", "206 Moonlit Path DriveShady Shores, TX 76208-5758", "3300 Rampart Drive, Plano, TX 75074-2800", "5604 Kingston Court, Richardson, TX 75082-4002", "12589 Peace River Drive, Frisco, TX 75035-0144", "2700 Lake Flower DriveFlower Mound, TX 75022-4380", "2105 Martin David Way, Garland, TX 75042-3958", "1103 Portland DriveTrophy Club, TX 76262-5449", "6801 Meade Drive, Colleyville, TX 76034-5778", "3828 Oxbow Creek, Plano, TX 75074", "1914 Duck Walk Way, Wylie, TX 75098-9100", "201 Covey Lane, McKinney, TX 75071-0328", "10 Mesquite RidgeCross Roads, TX 76227-5005", "15 Brookhollow Circle, Melissa, TX 75454-8915", "11300 Cedar Creek Drive, Aubrey, TX 76227", "3924 Heritage Park Drive, Sachse, TX 75048-4760", "3309 Monette Lane, Plano, TX 75025-5359", "315 Scarlet Drive, McKinney, TX 75072-5879", "202 Pebble Beach DriveTrophy Club, TX 76262-9747", "9758 Burleson Drive, Dallas, TX 75243-2305", "600 Park Bend Drive, Richardson, TX 75081-5630", "2405 River Rock Circle, Arlington, TX 76006-2779", "831 BRIDGEPORT Lane, Prosper, TX 75078-8543", "4413 Young Drive, Carrollton, TX 75010-1145",

    //portal.onehome.com_2021-07-08
    "2404 Lakepoint Drive, Keller, TX 76248-8403",

    //cannonteamhomes.com_2021-07-04
    "520 Smoke Tree Dr Murphy, TX 750944", "435 Dakota Dr Murphy, TX 750944",

    //cannonteamhomes.com_2021-07-03
    "7408 Galloway Ct Plano, TX 750244", "2608 Loftsmoor Ln Plano, TX 750255", "8121 Brasstown Dr Mc, Kinney, TX 750704",

    //cannonteamhomes.com_2021-07-02
    "1180 Rodeo Dr Murphy, TX 750945", "1704 Endicott Dr Plano, TX 750254",

    //cannonteamnhomes.com_2021-07-01
    "831 Bridgeport Ln Prosper, TX 750785", "2805 Crested Butte Dr Richardson, TX 750825", "8102 Ferndale Dr Sachse, TX 750486", "329 Mimosa Dr Murphy, TX 750944",

    //cannonteamhomes.com_2021-07-01
    "109 Devenshire Dr Murphy, TX 750945", "445 Smoke Tree Dr Murphy, TX 750944", "7317 Lougheed Plaza Plano, TX 750255", "1500 Bristlewood Dr Mc, Kinney, TX 750724", "323 Sagebrush Trl Murphy, TX 750944", "2117 Shrewsbury Dr Mc, Kinney, TX 750714", "701 Duck Bay Dr Murphy, TX 750944", "2525 Sunnyside Dr Mc, Kinney, TX 750714", "4233 Helmsley Ln Plano, TX 750934", "9897 County Road 745 Princeton, TX 754074",

    //www.trulia.com_2021-06-26
    "1001 Finsbury Ln, Forney, TX", "1012 Brigham Dr, Forney, TX", "10474 Country View Ln, Forney, TX", "1028 Hoxton Ln, Forney, TX", "160 Concan Dr, Forney, TX", "Lot 9 A Ceder Elm Ln, Nevada, TX", "459 Chippendale Dr, Rockwall, TX", "2511 Hidden Valley Trl, Sherman, TX", "291 Bronco TrlLittle Elm, TX", "3112 San Saba Ct, Rockwall, TX", "609 FM 2194Farmersville, TX", "610 Scenic Dr, Heath, TX",
    "502 Shelby Trl, Bells, TX", "700 Paradise CvShady Shores, TX", "4809 Lindsey Dr, Rowlett, TX", "2099 Vinson Rd, Wylie, TX", "219 Navajo Trl, Gainesville, TX", "2707 Naomi Ct, Farmersville, TX", "2621 Johnson Ct, Heath, TX", "11 Sunset Trl, Heath, TX", "705 Crestbrook DrFlower Mound, TX", "150 Jordan Creek Rd, Collinsville, TX", "1020 Devonshire Dr NForney, TX",
    "483 Terry Ln, Heath, TX", "104 Bent Oak Dr, Aubrey, TX", "800 Camelot Ct, Lewisville, TX", "33 Galvan LnVan Alstyne, TX", "1109 Devonshire Dr SForney, TX", "1350 Riverside Oaks Dr, Rockwall, TX", "15310 S FM 372Valley View, TX", "2808 Neely TrlValley View, TX",
    "1012 Native Trl, Heath, TX", "400 Willowsprings Dr, Rockwall, TX", "145 County Road 2254Valley View, TX", "2340 W Washington St, Sherman, TX", "913 Majestic Ct, Heath, TX", "853 Potomac Dr, Rockwall, TX", "5315 Standing Oak Ln, Rockwall, TX", "4622 Magnolia Park Dr, Arlington, TX", "768 Windsong Ln, Rockwall, TX",
    "5850 Naples DrFlower Mound, TX",

    //www.redfin.com_2021-06-26
    "4465 Bailey Ct, Plano, TX 75093", "8509 Autumn Lake Trl, Mc, Kinney, TX 75071", "4104 Opus Ct, Flower Mound, TX 75022", "7301 Clear Rapids Dr, Mc, Kinney, TX 75071", "1207 Whitestone Dr, Murphy, TX 75094", "646 Joshua Ln, Coppell, TX 75019", "4225 Chippewa Ct, Carrollton, TX 75010", "1812 N Waddill St, Mc, Kinney, TX 75069",

    //www.trulia.com_2021-06-26
    "810 14th St, Plano, TX", "300 Dove Crk, Mckinney, TX",

    //portal.onehome.com_2021-06-26
    "1804 Kendall Court, Keller, TX 76248-7322", "1009 Palmer Lane, DeSoto, TX 75115",

    // www.redfin.com_2021-06-26
    "3007 Eagle Ln, Melissa, TX 75454", "3107 Columbia Dr, Melissa, TX 75454", "8705 Lakeport Dr, Rowlett, TX 75089", "3312 Fannin Rd, Melissa, TX 75454", "1101 Dodd Dr, Wylie, TX 75098", "3609 Quail View Dr, Mc, Kinney, TX 75071", "9739 County Road 744, Princeton, TX 75407", "8702 Lakeside Dr, Rowlett, TX 75088", "880 Overland Dr, Lowry Crossing, TX 75069", "417 Ashland Dr, Wylie, TX 75098", "1229 Waters Edge, Rockwall, TX 75087", "7812 Bow Ct, Frisco, TX 75035", "8717 Autumn Lake Trl, Mc, Kinney, TX 75071", "9199 Kiwi Cir, Princeton, TX 75407", "116 S Bending Oak Ln, Wylie, TX 75098", "11585 County Road 738, Princeton, TX 75407", "130 Hunters Glen Dr, Wylie, TX 75098", "6632 Pinebluff Dr, Plano, TX 75074", "2406 Sweetgum Ct, Dallas, TX 75098", "6913 Marigold Ct, Plano, TX 75074", "3313 Cedar Creek Ln, Sachse, TX 75048", "2001 Knights Ct, Allen, TX 75013", "522 Vista View Dr, Murphy, TX 75094", "225 E Hazelwood St, Princeton, TX 75407", "7210 Lynn Dr, Rowlett, TX 75088", "3102 W Fannin Rd, Melissa, TX 75454", "Wilson Way, Princeton, TX 75407", "1627 Eastwood Rd, Melissa, TX 75454",
    "1229 Waters Edge, Rockwall, TX 75087", "8717 Autumn Lake Trl, Mc, Kinney, TX 75071", "509 Camrose Ln, Murphy, TX 75094",

    // www.redfin.com_2021-06-26
    "4130 Kate Dr, Frisco, TX 75034", "190 Shennendoah Ln, Rockwall, TX 75087", "7813 Evening Star Dr, Rowlett, TX 75089", "712 Chapel Ct, Allen, TX 75002", "5978 County Road 471, Mc, Kinney, TX 75071", "715 Cross Fence Dr, Lowry Crossing, TX 75069", "7134 Hunt Ln, Rockwall, TX 75087", "6501 Cartier Ct, Mc, Kinney, TX 75072", "11578 County Road 736, Princeton, TX 75407", "509 Angle Ridge Dr, Murphy, TX 75094", "1600 Country Walk Ln, Wylie, TX 75098", "11076 Saguaro St, Frisco, TX 75033", "304 Harvard Dr, Princeton, TX 75407", "2700 Club Ridge Dr #10, Lewisville, TX 75067", "5209 Trail House Way, Mc, Kinney, TX 75071", "414 Overland Trl, Mc, Kinney, TX 75071",

    // portal.onehome.com_2021-06-26
    "6505 Lantana Drive, Denton, TX 76208-7319", "7008 Royal Oak Estates Drive, Sachse, TX 75048-3427", "2208 Meandering Way, McKinney, TX 75071", "4 Rainforest Circle, Allen, TX 75013-6324", "3310 Shadow Wood CircleHighland Village, TX 75077-1803",

    // portal.onehome.com_2021-06-25
    "2917 Cascade Drive, Plano, TX 75025-4108", "3113 Oakview Drive, Hurst, TX 76054-2019", "411 Chatham Street, Sunnyvale, TX 75182-4003", "2527 Pinebluff Drive, Dallas, TX 75228-5869", "1812 Kipling DriveFlower Mound, TX 75022-4453", "605 Bellah Drive, Irving, TX 75062-3695", "313 Russwood Street, Rockwall, TX 75087-4207", "2708 Pasadena PlaceFlower Mound, TX 75022-5149", "3427 Lakewood LaneFlower Mound, TX 75022-6806", "1401 Driftwood Drive, Euless, TX 76040-6409", "880 Mellanie Court, Celina, TX 75009-5583", "8809 Hedge Row CourtNorth Richland Hills, TX 76182-8350", "920 W Avenue DGarland, TX 75040-7003", "3509 Fox Glen Drive, Colleyville, TX 76034", "1910 Orchard Grove Drive, Rowlett, TX 75088-1519", "3406 Moss Creek Knoll, Grapevine, TX 76051-6522", "800 Forest Crossing Drive, Hurst, TX 76053-7164", "2714 Winding Hollow Lane, Arlington, TX 76006-4022", "105 Red Bluff CourtHickory Creek, TX 75065-3628", "2003 W Oak Street, Denton, TX 76201-3720", "2427 Pebblebrook CourtGrand Prairie, TX 75050-2720", "1700 Timber Ridge Circle, Corinth, TX 76210-2812", "1714 Williams Road, Irving, TX 75060-3251", "425 San Gabriel Way, Sunnyvale, TX 75182-4613", "37 Highview Circle, Denton, TX 76205-8541", "3273 Shady Glen Drive, Grapevine, TX 76051-6503", "1712 Lynhurst Lane, Denton, TX 76205-8086", "301 Evans DriveVan Alstyne, TX 75495", "1117 Sunset DriveTrophy Club, TX 76262-5445", "5635 Santa Fe Avenue, Dallas, TX 75214", "1407 Cliffwood Road, Euless, TX 76040-6403",

    // cannonteamhomes.com_2021-06-25
    "324 Ambrose Dr Murphy, TX 750945", "1025 Saint Peter Dr Murphy, TX 750945", "4136 Los Altos Dr Plano, TX 750244",

    // portal.onehome.com_2021-06-25
    "2203 Forest Creek, McKinney, TX 75072-4327", "1061 Eagles Landing BoulevardOak Point, TX 75068-3070", "121 Las Colinas TrailCross Roads, TX 76227-1721", "3913 Valley View LaneFlower Mound, TX 75022-6108", "5807 Glenmore Drive, Parker, TX 75002-5435", "458 Barnes Bridge Road, Sunnyvale, TX 75182-9110", "2757 Oakwood Drive, Celina, TX 75009-2801", "661 Comanche CircleShady Shores, TX 76208-5167", "1448 Highland Court, Keller, TX 76262", "40 Meadowcreek Drive, Melissa, TX 75454-8906", "4216 Las Brisas Dr, Irving, TX 75038-9046", "110 High Oaks DriveDouble Oak, TX 75077-8261", "263 Whites Hill RoadVan Alstyne, TX 75495-4354", "4033 Bordeaux CircleFlower Mound, TX 75022-7050", "7750 E Parker Road, Wylie, TX 75002-7045", "1320 Stonecreek Court, Garland, TX 75043-1239", "1401 Egan Street, Denton, TX 76201-2734", "2760 Fuller Wiser Road, Euless, TX 76039-7940",

    // portal.onehome.com_2021-06-25
    "804 Carroll Drive, Garland, TX 75041-4421", "315 Cliffdale Drive, Euless, TX 76040-5485", "2633 Ashley Drive, Garland, TX 75041-2813", "2620 Lismore DriveFlower Mound, TX 75022-4398", "2102 Rock Creek DriveGrand Prairie, TX 75050-2284", "9719 County Road 474Anna, TX 75409-8604", "7157 County Road 277Anna, TX 75409-4206", "1526 7th StreetGrand Prairie, TX 75050-2336", "2180 Snider Lane, Lucas, TX 75002-7922", "2383 Bryant Street, Melissa, TX 75454-3076",

    // portal.onehome.com_2021-06-24
    "5604 Four Seasons Ln, McKinney, TX 750714",
    "1915 Baltimore Drive, Allen, TX 75002-2623", "2901 Hagen Drive, Plano, TX 75025-6427", "8612 Spectrum Drive, McKinney, TX 75072-5862",
    "17606 Squaw Valley Drive, Dallas, TX 75252", "1037 Cassion Drive, Lewisville, TX 75067-7479", "3916 Clifton Drive, Richardson, TX 75082-3623", "7006 Calm Meadow Court, Garland, TX 75044-3489",
    "125 Mill Crossing EColleyville, TX 76034-3663", "5108 White Pine DriveFlower Mound, TX 75028-5208", "3210 Hill DaleHighland Village, TX 75077", "3504 Preakness DriveFlower Mound, TX 75028-3971", "1501 Shady Grove Circle, Rockwall, TX 75032-5471", "3701 Red Oak Drive, Corinth, TX 76208-5359", "1109 Travis Circle SIrving, TX 75038-6240",
    "325 Greenfield Dr Murphy, TX 750944",

    // portal.onehome.com_2021-06-24_2
    "3509 Carlton Court, Sachse, TX 75048-2394", "12819 Ridge Spring Drive, Frisco, TX 75035", "1560 Karen Drive, Argyle, TX 76226-2946", "15824 Gardenia Road, Frisco, TX 75033", "3694 Copper Point Lane, Frisco, TX 75034-0760", "5561 Glenview LaneThe Colony, TX 75056-3785", "2812 Meadow Wood DriveFlower Mound, TX 75022-6732", "9024 Violet Drive, Lantana, TX 76226-1937", "931 Birdsong Drive, Allen, TX 75013-5839", "2928 Hackberry Creek Trail, Celina, TX 75078-9638", "3415 Maggie Road, Melissa, TX 75454-0168", "4465 Sandy Water Lane, Plano, TX 75024-7714", "8609 Orchard Hill Drive, Plano, TX 75025-4793", "3332 Timber Brook Drive, Plano, TX 75074-8746", "5101 Shallow Pond DriveLittle Elm, TX 76227-1938", "427 Long Cove Drive, Fairview, TX 75069-1957", "1408 Anna Marie Lane, Allen, TX 75013-2810", "621 Logans Way Drive, Prosper, TX 75078-2527",
    "3012 Martha Drive, Wylie, TX 75098-8122",

    // www.realtor.com_2021-06-24
    "3905 Dendron Dr, Flower Mound, TX 75028",

    // portal.onehome.com_2021-06-24
    "3021 Normandy Drive, McKinney, TX 75070-4731", "2817 Woods Lane, Garland, TX 75044-2809", "800 Holly Circle, Allen, TX 75002-5216",

    // cannonteamhomes.com_2021-06-24
    "428 Sloan Creek Pkwy, Fairview, TX 750694",

    // www.realtor.com_2021-06-23
    "590 Norman Cir, Anna, TX 75409",

    // cannonteamhomes.com_2021-06-23
    "4200 Honeysuckle Dr McKinney, TX 750704", "3841 Walnut Ridge Ln, Plano, TX 750744", "3504 Hearst Castle Way, Plano, TX 750254",

    // portal.onehome.com_2021-06-23
    "3012 Colorado Drive, Little Elm, TX 75068-1456", "2616 Longbow Drive, Little Elm, TX 75068-6915", "2317 Reston Drive, McKinney, TX 75072-8836", "1221 Horsetail Drive, Little Elm, TX 75068-4685", "13331 Cottage Grove Drive, Frisco, TX 75033-1684", "8105 Greenwood Drive, Plano, TX 75025-4023", "2804 Whitetail Court, McKinney, TX 75072-7784", "2308 Emerald Lake Lane, Little Elm, TX 75068-5979", "561 Bramante Drive, Plano, TX 75075", "4401 Rock Springs Drive, Plano, TX 75024-3478",
    "14154 Mensano Drive, Frisco, TX 75035-9277", "9400 Blanco Drive, Lantana, TX 76226-7202", "15191 Maroon Bells Lane, Frisco, TX 75035-0272", "11300 Misty Ridge Drive, Flower Mound, TX 76262-1928", "1605 Eleanor Drive, Fort Worth, TX 76052", "3417 Melrose Court, Wylie, TX 75098", "10517 Sandy Mountain Drive, McKinney, TX 75072-3173",
    "3841 Walnut Ridge Lane, Plano, TX 75074-1637", "4200 Honeysuckle Drive, McKinney, TX 75070-4499", "3504 Hearst Castle Way, Plano, TX 75025-3701", "917 Kilgore Court, Allen, TX 75013-1115", "222 Lairds Drive, Coppell, TX 75019-7922", "1100 Yale Circle, Plano, TX 75075-8322", "1820 Meadow Ranch Road, McKinney, TX 75071-6497", "2621 E Merlin Drive, Lewisville, TX 75056-5753",

    // www.trulia.com_2021-06-22
    "2621 Merlin Dr, Lewisville, TX",

    // portal.onehome.com_2021-06-22
    "4849 Forest Lane, Dallas, TX 75244-7718", "10454 Balsam Court, Frisco, TX 75033-2492", "1006 Creekwood Drive, Garland, TX 75044-2410",

    //www.realtor.com_2021-06-20
    "1817 Palomino Dr, Rowlett, TX 75088", "1201 E Oak St, Wylie, TX 75098",

    //www.trulia.com_2021-06-20
    "1920 Fountain Spray Dr, Wylie, TX", "3808 Bluff Creek Ln, Mckinney, TX", "506 Comanche Trl, Plano, TX", "731 Trail Dr, Prosper, TX", "1209 Oakley Dr, Murphy, TX", "1002 Tyler Trl, Wylie, TX", "3800 Oxbow Creek Ln, Plano, TX", "9208 Hunter Chase Dr, Mckinney, TX", "1831 Morning Mist Way, Wylie, TX", "2404 Green Meadow Dr, Sachse, TX", "630 Gene Autry Ln, Plano, TX", "1908 Lorraine Ave, Allen, TX", "1502 Miracle Mile, Wylie, TX", "136 Collin Ct, Murphy, TX", "3222 Berry Holw, Melissa, TX", "325 Daleport Dr, Murphy, TX", "3000 Charles Dr, Wylie, TX", "118 Echo Ridge Ln, Murphy, TX", "261 Wedgewood Way, Lucas, TX", "2002 Blue Water Trl, Wylie, TX", "2040 Hacienda Heights Ln, Frisco, TX", "841 Willowmist Dr, Prosper, TX", "529 Quarter Horse Ln, Frisco, TX", "7909 Sawgrass Dr, Mckinney, TX",

    //cannonteamhomes.com_2021-06-20
    "341 Apache Trl, Murphy, TX 750945",

    //cannonteamhomes.com_2021-06-19
    "4325 Auburn Dr Flower Mound, TX 750284", "7209 Red Cedar Ct Denton, TX 762084", "1108 Shell Beach Dr Little Elm, TX 750684", "1734 Boxwood Ln Wylie, TX 750984", "2105 Friar Ct Flower Mound, TX 750284", "2213 Lakeway Terrace Flower Mound, TX 750285", "1201 Cherry Brook Way Flower Mound, TX 750284", "3121 Ashwood Ct Richardson, TX 750824", "3401 Olivia Dr Wylie, TX 750984", "842 Sherry Ln S Krugerville, TX 762274",

    // portal.onehome.com_2021-06-19
    "1210 Caliche Trail, Allen, TX 75013-5894", "2201 All Saints Lane, Plano, TX 75025-5535", "3404 Edwards Drive, Plano, TX 75025-4544", "1210 Caliche Trail, Allen, TX 75013-5894", "2201 All Saints Lane, Plano, TX 75025-5535", "3404 Edwards Drive, Plano, TX 75025-4544", "1210 Caliche Trail, Allen, TX 75013-5894", "2900 Mountain Creek Drive, McKinney, TX 75072-7185", "1818 Commander Court, Allen, TX 75002-5807", "13561 Crestmoor DriveFarmers Branch, TX 75234-5122", "9804 Sota Grande Drive, Plano, TX 75025-6500", "303 Prince Albert Court, Richardson, TX 75081-5059", "3925 Kite Meadow Drive, Plano, TX 75074-7757", "1113 Holy Grail Drive, Lewisville, TX 75056-5745", "7617 Rolling Acres Drive, Dallas, TX 75248-5612", "1107 Winnsboro Court, Allen, TX 75013-6306", "1816 Sundown Lane, Allen, TX 75002-1554", "2103 Fairway Vista Drive, McKinney, TX 75072-4056", "3611 Amber Hills Drive, Dallas, TX 75287-6270", "7706 Ridgebluff Lane, Sachse, TX 75048-6556", "1203 Whitestone Drive, Murphy, TX 75094-4116", "1102 Babbling Brook Drive, Lewisville, TX 75067-5502", "3105 Springbranch Drive, Richardson, TX 75082-2462", "4408 Shadowridge DriveThe Colony, TX 75056-4104", "804 Overton Avenue, Celina, TX 75009-6438", "2500 Stone Creek Drive, Plano, TX 75075-3002", "12685 Burnt Prairie Lane, Frisco, TX 75035-5168", "5213 Sawgrass Drive, Garland, TX 75044-5040", "3213 Greenleaf Court, Garland, TX 75044", "13720 Posada Drive, Frisco, TX 75035-5214", "7007 Longmeadow Drive, Sachse, TX 75048-2112", "1311 Chaleur Bay Drive, Lewisville, TX 75056-4184", "4324 Peggy Lane, Plano, TX 75074-3566", "9934 Amberwoods Lane, Frisco, TX 75035-0297", "917 Cross Plains Drive, Allen, TX 75013-5475", "708 Wentworth Drive, McKinney, TX 75072-4919", "8500 Arbor Creek Lane, McKinney, TX 75072-6765", "8000 Canterbury Terrace, McKinney, TX 75072-6939", "4625 Oak Shores Drive, Plano, TX 75024-6826", "7440 Daffodil Way, Frisco, TX 75033-3829", "1601 Bryce Canyon Lane, Allen, TX 75002-2696", "1516 Brimwood Drive, McKinney, TX 75072-7121", "716 Westbrook Drive, Plano, TX 75075-8729", "8500 Spectrum Drive, McKinney, TX 75072-5863", "4573 Saint James Drive, Plano, TX 75024-4727", "2717 Regal Road, Plano, TX 75075", "808 Parkwood Court, McKinney, TX 75072-5389", "701 Willowview Drive, Prosper, TX 75078-8356", "5119 Yarbrough Street, Sachse, TX 75048-4755", "10038 Western Hills Drive, Frisco, TX 75033-8399", "8400 Clearview Court, Plano, TX 75025-4776", "245 Herod Street, Lewisville, TX 75057-3879", "2400 Cayenne Drive, McKinney, TX 75070-4729", "2104 Vintage Court, McKinney, TX 75072-4063", "2600 Cedarbrook Lane, Prosper, TX 75078-8993", "648 Burning Oak Drive, Frisco, TX 75036-8839", "433 Beacon Hill Drive, Coppell, TX 75019-3717", "328 Banbury Drive, Murphy, TX 75094-4296", "12114 Jackson Creek Drive, Dallas, TX 75243-5001", "2107 Springcress Drive, McKinney, TX 75072-5284", "7227 Sugar Maple Drive, Irving, TX 75063-5519", "2221 Lewis Canyon Drive, Prosper, TX 75078-0315", "10018 Hickory Crossing, Dallas, TX 75243-4616", "18711 Rembrandt Terrace, Dallas, TX 75287-3411", "3300 Canoncita Lane, Plano, TX 75023-8106", "2516 Little Creek Drive, Richardson, TX 75080-1815", "6619 Flanary Lane, Dallas, TX 75252-2529", "3654 Heritage Park Drive, Sachse, TX 75048-4739", "1308 Joshua Place, Allen, TX 75002-3685",

    //portal.onehome.com_2021-06-18
    "790 Manchester Avenue, Prosper, TX 75078-1447", "612 Mary Ruth Place, Celina, TX 75009-1779",

    //Realtor.com 20210615
    "348 Parkside Ct, Murphy, TX 75094", "2516 Little Creek Dr, Richardson, TX 75080", "7440 Daffodil Way, Frisco, TX 75033", "6619 Flanary Ln, Dallas, TX 75252", "8500 Arbor Creek Ln, McKinney, TX 75072", "9517 Edgeway Cir, Rowlett, TX 75089", "648 Burning Oak Dr, Frisco, TX 75036", "1516 Brimwood Dr, McKinney, TX 75072", "9602 Fairway Vista Dr, Rowlett, TX 75089", "2600 Cedarbrook Ln, Prosper, TX 75078", "1702 Splinter Dr, Wylie, TX 75098", "1120 Circle J Trl, Prosper, TX 75078", "804 Overton Ave, Celina, TX 75009", "4625 Oak Shores Dr, Plano, TX 75024", "7207 Hunters Ridge Dr, Dallas, TX 75248", "917 Cross Plains Dr, Allen, TX 75013", "1601 Bryce Canyon Ln, Allen, TX 75002", "13720 Posada Dr, Frisco, TX 75035", "3300 Canoncita Ln, Plano, TX 75023", "9715 Edgeway Cir, Rowlett, TX 75089", "7712 Turnberry Ln, Dallas, TX 75248", "3213 Greenleaf Ct, Garland, TX 75044", "6811 Bradford Estates Dr, Sachse, TX 75048", "2107 Springcress Dr, McKinney, TX 75072", "11401 Beckton St, McKinney, TX 75071", "4527 Parkridge Cir, Sachse, TX 75048", "720 Sterling Dr, Murphy, TX 75094", "328 Banbury Dr, Murphy, TX 75094", "2823 N Surrey Dr, Carrollton, TX 75006", "702 Lone Star Ct, Wylie, TX 75098", "6217 Dewitt St, Sachse, TX 75048", "511 Sun Meadow Dr, Wylie, TX 75098",
    //portal.onehome.com_20210617
    "4428 Elmhurst Drive, Plano, TX 75093-3257", "916 Parkwood Court, McKinney, TX 75072-5391", "4305 Oak Knoll Drive, Plano, TX 75093-3250", "1921 Antwerp Avenue, Plano, TX 75025-3320", "8512 Beech Lane, McKinney, TX 75072-6722", "201 Green Valley Drive, McKinney, TX 75071-5849", "3912 Maverick Trail, McKinney, TX 75072-4101", "8424 Brooksby Drive, Plano, TX 75024-3758"
];