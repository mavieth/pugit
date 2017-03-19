#! /usr/bin/env node

const commandLineArgs = require('command-line-args');
const getUsage = require('command-line-usage');
const html2jade = require('html2jade');
const path = require('path');
const fs = require('fs');
const progress = require('progress-stream');
const req = require('request');
const colors = require('colors');

// Globals
var fullFilePath;
var data;
var html;

const optionDefinitions = [{
    name: 'src',
    type: String,
    multiple: true,
    defaultOption: true
}, {
    name: 'spaces',
    alias: 's',
    type: Number,
    defaultOption: 2
}, {
    name: 'file',
    type: FileDetails
}, {
    name: 'help',
    alias: 'h',
    type: FileDetails
}, {
    name: 'bodyless',
    alias: 'b',
    type: Boolean,
    defaultOption: false
}, {
    name: 'output',
    alias: 'o',
    type: String,
}, {
    name: 'quiet',
    alias: 'q',
    type: Boolean,
}]

const sections = [{
    header: 'pugit',
    content: [{
        desc: 'Convert HTML files to .pug files.\n'
    }, {
        desc: '1. A full body example. ',
        example: '$ pugit test.html'
    }, {
        desc: '2. Bodyless output.',
        example: '$ pugit test.html --bodyless'
    }, {
        desc: '3. Bodyless with 4 spaces instead of 2.',
        example: '$ pugit test.html --bodyless --spaces 4'
    }, {
        desc: '4. New output filename.',
        example: '$ pugit test.html --output newoutput.html'
    }, ]
}, {
    header: 'Options',
    optionList: [{
            name: 'file',
            alias: 'f',
            type: String,
            multiple: false,
            defaultOption: true,
            description: 'HTML file to process. Default: new file same name with a .pug extension.'
        }, {
            name: 'spaces',
            alias: 's',
            type: Number,
            multiple: false,
            description: 'Number of spaces used in file output. Default: 2.'
        }, {
            name: 'output',
            alias: 'o',
            type: String,
            multiple: false,
            description: 'Output filename.'
        }, {
            name: 'bodyless',
            alias: 'b',
            type: Boolean,
            multiple: true,
            defaultOption: optionDefinitions[4].defaultOption,
            description: 'Include HTML header in the pug output. Default: false.'
        }, {
            name: 'quiet',
            alias: 'q',
            type: Boolean,
            multiple: false,
            description: 'Hide console output.'
        },

        {
            name: 'help',
            alias: 'h',
            description: 'Show usage.'
        }
    ]
}]


const usage = getUsage(sections);
const options = commandLineArgs(optionDefinitions);


function FileDetails(filename) {
    if (!(this instanceof FileDetails)) return new FileDetails(filename)
    this.filename = filename
    this.exists = fs.existsSync(filename)
}
var showUsage = function() {
    console.log(usage);
}
var getFileName = function() {
    return path.resolve(options.src[0])
}
var getFileContent = function() {

    fullFilePath = getFileName();
    if (fs.existsSync(fullFilePath)) {
        var stat = fs.statSync(fullFilePath);
        var str = progress({
            length: stat.size,
            time: 1000
        });
        var readStream = fs.createReadStream(fullFilePath, 'utf8');
        readStream.on('data', function(chunk) {
            data += chunk;
        }).on('end', function() {
            // console.log(data);
            html = data;
            createPug(html);
        });
    } else {
        console.log(colors.red("Error:") + " File " + colors.yellow(fullFilePath) + " does not exist.");;
    }
}

var createPug = function(html) {
    var pugFileData;
    var pugOptions = {
        double: true,
        numeric: false,
        scalate: false,
        nspaces: 2,
        tabs: false,
        donotencode: false,
        bodyless: false,
        noemptypipe: true
    };

    if (options.full) {
        pugOptions.bodyless = options.full;
    };
    if (options.spaces) {
        pugOptions.nspaces = options.spaces;
    };

    html2jade.convertHtml(html, pugOptions, function(err, pugData) {
        pugFileData = pugData;
    });
    saveNewPugFile(pugFileData);
};


function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}


var saveNewPugFile = function(data) {
    fullFilePath = getFileName();

    if (options.output) {
        console.log(options.output);
        var fullFilePath = path.dirname(fullFilePath) + options.output;
    } else {
        fullFilePath = getFileName().replace(".html", ".pug");
    }

    ensureDirectoryExistence(fullFilePath);

    fs.writeFile(fullFilePath, data, (err) => {
        if (err) throw err;
        if (!options.quiet) {
            console.log(colors.green.underline("Success:") + " Saved new pug file: " + fullFilePath);
        }
    });
};

var main = function() {
    if (options.help || !options.src) {
        showUsage();
    } else if (options.src) {
        getFileContent();
    }
}

main();