/**
 * Created by 晚九 on 2016/11/24.
 */
module.exports = function (grunt) {
    //导入插件
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    //任务(项目)
    grunt.initConfig({
        cssmin: {
            a: {
                src: 'src/css/**/*.css',//源目录
                dest: 'build/css/all.min.css'//目标
            }
        },
        copy: {
            a: {
                expand: true,
                cwd: 'src/img',
                src: '**/*.*',//源目录
                dest: 'build/img'//目标
            }
        },
        uglify: {
            a: {
            	options:{
					removeComments:true,
					collaseWhitespace:true 
				},
                expand: false,
                src: '**/js/*.js',//源目录
                dest: '../CUSTOMER.min/**/js/all.min.js'//目标
            }
        },
        htmlmin: {
            a: {
                options: {
                    removeComments: true,
                    collapseWhitespace:true
                },
                expand: true,
                cwd: 'src',
                src: '**/*.html',//源目录
                dest: 'build'//目标
            }
        }
    });

    //注册默认任务
    //grunt.registerTask('default', ['cssmin','copy','uglify','htmlmin']);

};

