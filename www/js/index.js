/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    //Index for paging
     index: 0,
     cacheIndex: 0,
     clickDate: null,
     tapDate: null,
     dataAccess: null,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
        $( document ).ready(this.onDeviceReady);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        $('.chapter').swipeleft(function(e){ slideRight()});
        $('.chapter').swiperight(function(e){  slideLeft()});

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

        app.dataAccess = new DataAccess();
        
        $('#button').on('click', function() {
            app.clickDate = new Date();
            $('#clickDate').html(toTimeDate(app.clickDate));
            $('#difference').html(app.clickDate - app.tapDate + "ms");
        });

        $('#button').on('tap', function() {
            app.tapDate = new Date();
            $('#tapDate').html(toTimeDate(app.tapDate));
           
        });

        $('#loadData').on('tap', function(){
            
            $('#ajaxContent').html('<img src="img/loader.gif" width="60px" />');

            setTimeout(function(){

                    //Ajax call here
                    var todos = ['Load dom', 'make ajax call', 'refresh dom'];
                        
                    var htmlString = "";
                    todos.forEach(function(todo){
                          htmlString += '<li><h3>todo: ' + todo + '</h3></li>';
                    });

                    $('#ajaxContent').html(htmlString);


            }, 3000);

        });

        $('#clearCache').on('tap', function(){
            app.dataAccess.clear();
        });

        $('#getTempCachedData').on('tap', function(){

            var data = app.dataAccess.getTempCachedData();
            displayData(data, app.dataAccess.serviceCalls);
        });

        $('#getLongCachedData').on('tap', function(){

            var data = app.dataAccess.getLongCachedData();
            displayData(data, app.dataAccess.serviceCalls);

        });


    }
};

function slideLeft(name, reverse)
{
    if(app.index > 0)
    {
        app.index--;
        $.mobile.changePage( "#page_" + app.index, { transition: "slide", reverse: true  } );
    }
}

function slideRight(name, reverse)
{
    if(app.index < 6)
    {
        app.index++;
        $.mobile.changePage( "#page_" + app.index, { transition: "slide" } );
    }
}

function toTimeDate(date){
    var miliseconds = date.getMilliseconds();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hour = date.getHours();
    return hour + ':' + minutes + ':' + seconds + ':' + miliseconds;
}

function DataAccess()
{
    var self = this;

    self.cachedData = null;
    self.serviceCalls = 0;

    self.clear = function()
    {
        window.localStorage.clear();
        self.cachedData = null;
    }

    self.getTempCachedData = function()
    {
        if(!self.cachedData)
        {
             //ajax call
            var data = { name: 'stino', gamertag: 'linksonder' };

            //Set cache
            self.cachedData = data;
        }

        return self.cachedData;
    }

    self.getLongCachedData = function()
    {
        //Retreive the data from the local storage
        var cachedData = window.localStorage.cachedData;

        //If possible, parse the data from to json
        cachedData = cachedData ? JSON.parse(cachedData) : null;

        //Check if the cached data is still valid
        if(cachedData && new Date() < new Date(cachedData.validTill) )
        {
            return cachedData;
        }
        else 
        {
            //####### fake ajax call #######
            var data = { name: 'stino', gamertag: 'linksonder'};
            self.serviceCalls++; 
            //### end of fake ajax call ###

            //Set time and cache
            var time = new Date(); //Get the current date
            time.setSeconds(time.getSeconds() + 5); //This cache lasts 5 seconds
            data.validTill = time; 

            //Stringify data so that we can store it in the localstorage
            //We could also use WebSQL
            window.localStorage.cachedData = JSON.stringify(data);

            return data;
        }
    }

}

function displayData(data, callCounter){
     $('#counter').html('<i>(calls: ' + callCounter + ')</i>');
     $("#time").html(data.validTill ? data.validTill : "");
     $("#name").html(data.name ? data.name : "");
     $("#gamertag").html(data.gamertag? data.gamertag : "");
}