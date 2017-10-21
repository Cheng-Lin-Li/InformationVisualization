# Student computing facility how-to

All USC students are eligible to access UNIX computing resources at `aludra.usc.edu` and `nunki.usc.edu` using their Student Computing Facility (SCF) accounts.
See the [SCF](https://itservices.usc.edu/scf/) page for more details.

## Publishing web pages

These are main steps needed to publish web pages, no matter which software you use:

1. Create `public_html` directory (folder) if it does not exist.
2. Copy your files into `public_html`.
3. Make `public_html` folder and files publicly readable.
4. Check the page is accessible on your browser.

## Software to connect
You can connect to `aludra.usc.edu` in one of several ways:

- [SFTP](https://itservices.usc.edu/sftp) (secure FTP) using an FTP client such as [Filezilla](https://filezilla-project.org). ***Recommended.***
- [SSH](https://itservices.usc.edu/ssh) from a Unix-compatible terminal (e.g., using [Putty](http://www.putty.org) in Windows, also available on the [ITS software pages](https://itservices.usc.edu/software/)).
- Use [MobaXterm](http://mobaxterm.mobatek.net/) (support both SSH and SFTP). 

### SSH Example

In the following `<username>` is your USC username as it appears in your USC email address. For a list of basic Unix commands refer to 
```
$ ssh <username>@aludra.usc.edu
$ mkdir public_html
$ cd public_html  # enter public_html directory
$ cat > index.html  # paste what follows, type Ctrl+D when done
<html>
   <head>
       <title>HTML Page Template</title>
   </head>
   <body>
       Hello!
   </body>
</html>

```
To make files readable by `www` user for `Apache` webserver to access execute:
```
$ chmod -R 755 ~/public_html  
```

`public_html` will be accessible at: 

```http://www-scf.usc.edu/~<username>/```

## References
- [ITS SCF](https://itservices.usc.edu/scf/)
- [ITS software](https://itservices.usc.edu/software/)
- https://www.youtube.com/watch?v=yfDDw4v0bzY
- http://www.putty.org
- https://filezilla-project.org
- http://mobaxterm.mobatek.net/
