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

                    $('#ajaxContent').listView();

            }, 3000);

        });

        $('#clearCache').on('tap', function(){
            window.localStorage.clear();
        });

        $('#loadCache').on('tap', function(){
            
            if(window.localStorage.cachedData)
            {
                var cachedTime = new Date(window.localStorage.cachedData);

                var time = new Date();
                if(time < cachedTime)
                {
                    alert("still cached");
                }
                else
                {
                    var time = new Date();
                    time.setSeconds(time.getSeconds() + 10);
                    window.localStorage.cachedData = time;
                    alert("refreshed cache");
                }
            }
            else
            {
                var time = new Date();
                time.setSeconds(time.getSeconds() + 10);
                window.localStorage.cachedData = time;
                alert("new Cache!");
            }
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
    if(app.index < 7)
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
