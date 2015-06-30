'use strict';

define(function () {
    var constant = {
        
        cutoffHours: {
            SERVICE: 72,
            FELLOWSHIP: 0
        },

        eventType: {
            FAMILY_EVENT: 4096,
            FELLOWSHIP: 2,
            OTHER: 4,
            SERVICE: 1,

            CAMPUS: 16,
            COMMUNITY: 8,
            FRATERNITY: 32,
            FUNDRAISER: 128,
            GENERAL: 8192,
            NATION: 64,
        
            COOL_FELLOWSHIP: 2048,
            CRAZY_FELLOWSHIP: 512,
            INTERCHAPTER_AWAY: 32768,
            INTERCHAPTER_HOME: 256,
            MEETING: 16384,
            SEXY_FELLOWSHIP: 1024,

            GENERAL_FELLOWSHIP: function () { return this.GENERAL; },
            GENERAL_EVENT: function () { return this.MEETING + this.OTHER; },
            INTERCHAPTER: function () { return this.INTERCHAPTER_HOME + this.INTERCHAPTER_AWAY ; }
        },

        role: {
            WEBMASTER: 1,
            PRESIDENT: 2,
            SERVICE_VP: 4,
            FELLOWSHIP_VP: 8,
            MEMBERSHIP_VP: 16,
            TREASURER: 32,
            REC_SEC: 64,
            COR_SEC: 128,
            SAA: 256,
            HISTORIAN: 512,
            PLEDGE_PARENT: 1024,
            CRAZY_FAMILY_HEAD: 2048,
            SEXY_FAMILY_HEAD: 131072,
            COOL_FAMILY_HEAD: 262144,
            ACTIVE: 4096,
            PLEDGE: 8192,
            ALUMNUS: 16384,
            PROBATIONARY: 32768,
            ASSOCIATE: 65536,
            AFFILIATE: 524288,
            ADVISOR: 1048576,       
            INACTIVE: 2097152,
            FUNDRAISING: 4194304,
            SPIRIT: 8388608,
            PUBLICITY: 16777216,
            ALUMNI_CHAIR: 33554432,

            // The following define groups that can sign up for events or view important dates on homepage
            OPEN_EVERYONE: function () {
                return this.ACTIVE + this.PLEDGE + this.ALUMNUS + this.PROBATIONARY + this.ASSOCIATE + this.AFFILIATE + this.INACTIVE;
            },
            
            OPEN_ACTIVE: function () {
                return this.ACTIVE + this.ALUMNUS + this.PROBATIONARY + this.ASSOCIATE + this.AFFILIATE + this.INACTIVE;
            }
        }
    };

    return constant;
});