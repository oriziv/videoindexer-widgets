/**
 * AMP & Video Indexer - Iframe Communication Mediator
 * Copyright (c) 2020 Microsoft
 * @author Ori Ziv
 * @version v0.8.80
 * @desc In charge the communication between videoindexer.com iframe.
 * @link https://www.videoindexer.com
 */

(function () {
    'use strict';
  
        // Jump to specific time from message payload
        function notifyWidgets(evt) {
  
            if (!evt) {
                return;
            }
            var origin = evt.origin || evt.originalEvent.origin;
  
            // Validate that event comes from videoindexer domain.
            if (( origin === "http://localhost:4100"
                 || origin.includes('videoindexer.ai')
                 || (origin.includes('vi-fe-dev') && origin.includes('cloudapp.azure.com') ))
                 && evt.data) {
  
                // Pass message to other iframe.
                if ('postMessage' in window) {
                    var iframes = window.document.getElementsByTagName('iframe');
                    try {
                        for (var index = 0; index < iframes.length; index++) {
                            iframes[index].contentWindow.postMessage(evt.data, origin);
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            }
        }
  
        function clearMessageEvent() {
            if (window.removeEventListener) {
                window.removeEventListener("message", notifyWidgets);
            }
        }
  
        // Listen to message events from breakdown iframes
        window.addEventListener("message", notifyWidgets, false);
  
        // Clear the event if window unloads
        window.onunload = clearMessageEvent;
  
  }());
  