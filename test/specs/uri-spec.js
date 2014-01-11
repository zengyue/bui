BUI.use(['bui/uri/query'], function(Query){

  var query = new Query('a=1&b=2');

  describe('测试query', function(){

    it('测试query解析是否正确', function(){
      expect(query.get('a')).toBe('1');
      expect(query.get('b')).toBe('2');
    });

    it('测试query设置是否正确', function(){
      query.set('b', '3');
      expect(query.get('b')).toBe('3');
    });
  });
});



BUI.use(['bui/uri/path'], function(Path){
  describe('测试path', function(){

    it('测试相对路径是否正确', function(){
      // expect(Path.resolve('/a/b/c.php', '../d')).toBe('/a/b/d');
      expect(Path.resolve('/a/b/c', '../d')).toBe('/a/b/d');
      expect(Path.resolve('/a/b/c', '../d/e')).toBe('/a/b/d/e');
    });

    it('测试路径是否正确', function(){
      // expect(Path.resolve('/a/b/c.php', '../d')).toBe('/a/b/d');
      expect(Path.dirname('/a/b/c')).toBe('/a/b');
      expect(Path.dirname('/a/b/c/')).toBe('/a/b/c');
    });
  });
});

BUI.use(['bui/uri/uri'], function(Uri){

  var href = 'http://builive.com:80/demo/form.php?p=form/simple#form/simple-form.php',
    uri = new Uri(href);

  describe('测试uri', function(){

    it('测试scheme解析是否正确', function(){
      expect(uri.getScheme()).toBe('http');
    });
    it('测试hostname解析是否正确', function(){
      expect(uri.getHostname()).toBe('builive.com');
    });
    it('测试port解析是否正确', function(){
      expect(uri.getPort()).toBe('80');
    });
    it('测试path解析是否正确', function(){
      expect(uri.getPath()).toBe('/demo/form.php');
    });
    it('测试query解析是否正确', function(){
      expect(uri.getQuery().get('p')).toBe('form/simple');
    });
    it('测试fragment解析是否正确', function(){
      expect(uri.getFragment()).toBe('form/simple-form.php');
    });
    // it('测试toString是否正确', function(){
    //   expect(uri.toString()).toBe(href);
    // });
  });
});